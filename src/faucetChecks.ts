import {APIWrapper, Transaction, TransactionType} from 'risejs';
import { faucet, members } from './models';
import BigNumber from 'bignumber.js';

export class FaucetChecker {
  curHeight: number;
  satisfiedConditionsMsgs: string[] = [];

  constructor(private api: APIWrapper, private address: string) {
  }

  async performChecks(): Promise<string[]> {
    const {height} = await this.api.blocks.getHeight();
    this.curHeight = height;

    this.throwOrSatisify(await this.checkMembersVoted());
    this.throwOrSatisify(await this.checkUserBalance());
    this.throwOrSatisify(await this.checkLastUserReward());
    // this.throwOrSatisify(await this.checkLastPaymentWindowBalance());
    this.throwOrSatisify(await this.checkIfUserUnvotedMembersWithinPeriod());
    this.throwOrSatisify(await this.checkFaucetMaxRewardsPerWeek());
    this.throwOrSatisify(await this.checkFaucetBalance());
    return this.satisfiedConditionsMsgs;
  }

  async calculateRewardSatoshi(): Promise<BigNumber> {
    const {account} = await this.api.accounts.getAccount(this.address);
    const tenk = new BigNumber(10000).times(Math.pow(10,8));
    return BigNumber.min(tenk, new BigNumber(account.balance))
      .div(tenk)
      .times(Math.pow(10,8));
  }

  private throwOrSatisify(res: { error: boolean, msg: string }) {
    if (res.error) {
      throw new Error(res.msg);
    } else if (res.msg !== null) {
      this.satisfiedConditionsMsgs.push(res.msg);
    }
  }

  /**
   * Checks if faucet had already distributed max amount per week.
   * @returns {Promise<{error: boolean; msg: string}>}
   */
  private async checkFaucetMaxRewardsPerWeek(): Promise<{error: boolean, msg: string}> {
    const oneWeekBlocks = Math.floor(86400*7/10);
    const {height} = await this.api.blocks.getHeight();
    const allTransactions:Transaction<any>[] = [];
    let startHeight = height - oneWeekBlocks;
    let count = 1;
    while (count > 0) {
      const {transactions, count:c}  = await this.api.transactions.getList({limit: 1, "and:type": TransactionType.SEND, orderBy: "height:asc", "and:fromHeight": height - oneWeekBlocks});
      count = c;
      allTransactions.push.apply(allTransactions, transactions);
      if (transactions.length > 0 ) {
        startHeight = transactions[transactions.length-1].height
      }
    }

    let totalAmount = allTransactions
      .map(tx => new BigNumber(tx.amount))
      .reduce((a,b) => a.plus(b));

    if (totalAmount.div(Math.pow(10,8)).gt(faucet.maxWeekReward)) {
      return {
        error: true,
        msg  : `Faucet balance already depleted for this week.`
      }
    }

    return {
      error: false,
      msg: null
    }
  }

  /**
   * Checks if faucet address has enough money.
   */
  private async checkFaucetBalance(): Promise<{ error: boolean, msg: string }> {
    const {balance} = await this.api.accounts.getBalance(faucet.rewardAddress);
    const {fee}     = await this.api.blocks.getFee();
    // check if there's at least 1 LSK there.
    if (new BigNumber(balance).minus(Math.pow(10, 8)).minus(fee).lt(0)) {
      return {
        error: true,
        msg  : `Faucet balance is too low. Please contact one of the LIG members.`
      }
    }
    return {
      error: false,
      msg  : null
    }

  }

  /**
   * Checks if all members are currently voted by the user
   */
  private async checkMembersVoted(): Promise<{ error: boolean, msg: string }> {
    const memberVoters = await Promise.all(
      members.map(m => this.api.delegates.getByUsername(m.name)
        .then(d => this.api.delegates.getVoters(d.delegate.publicKey))
        .then(({accounts}) => accounts)
      )
    );
    const membersVoted = memberVoters
      .map(voters => voters
        .some((v) => v.address === this.address)
      );

    const unvotedMembers = [];
    const votedMembers   = [];
    for (let i = 0; i < membersVoted.length; i++) {
      if (membersVoted[i]) {
        votedMembers.push(members[i].name);
      } else {
        unvotedMembers.push(members[i].name);
      }
    }

    if (unvotedMembers.length > 0) {
      return {
        error: true,
        msg  : `You did not vote for ${unvotedMembers.join(', ')}`
      }
    }

    return {
      error: false,
      msg  : 'You voted for all lig members!'
    }
  }

  /**
   * Checks if user has a valid balance that matches the reqs.
   */
  private async checkUserBalance(): Promise<{ error: boolean, msg: string }> {
    const {balance} = await this.api.accounts.getBalance(this.address);
    if (new BigNumber(balance).div(Math.pow(10, 8)).lt(faucet.minWalletAmount)) {
      return {
        error: true,
        msg  : `Your balance is too low you need at least ${faucet.minWalletAmount} LSK`
      };
    } else {
      return {
        error: false,
        msg  : `Your balance is higher than ${faucet.minWalletAmount} LSK`
      };
    }
  }

  /**
   * Checks last transaction sent to user and if enough time is elapsed
   */
  private async checkLastUserReward(): Promise<{ error: boolean, msg: string }> {

    const {transactions} = await this.api.transactions.getList({
      senderId         : faucet.rewardAddress,
      "and:recipientId": this.address,
      orderBy          : "height:desc",
      limit            : 1
    });

    if (transactions.length === 0) {
      // no transactions!
      return {
        error: false,
        msg  : 'Welcome :)'
      }
    } else {
      const missingBlocks = (transactions[0].height + faucet.delayBlocks) - this.curHeight;
      if (missingBlocks <= 0) {
        return {
          error: false,
          msg  : `You collected more than ${faucet.delayBlocks} blocks ago.`
        }
      } else {
        return {
          error: true,
          msg  : `Slow down cowboy. You can collect faucet reward in ${missingBlocks} blocks.`
        }
      }
    }
  }


  /**
   * Checks if the user went lower than 1000 lsk during last delayblocks
   * TODO: Remove as its not used anymore
   */
  private async checkLastPaymentWindowBalance(): Promise<{ error: boolean, msg: string }> {
    const {balance}              = await this.api.accounts.getBalance(this.address);
    const {transactions: outTxs} = await this.api.transactions.getList({
      senderId        : this.address,
      "and:type"      : TransactionType.SEND,
      "and:fromHeight": this.curHeight - faucet.delayBlocks,
      "and:toHeight"  : this.curHeight
    });
    const {transactions: inTxs}  = await this.api.transactions.getList({
      recipientId     : this.address,
      "and:type"      : TransactionType.SEND,
      "and:fromHeight": this.curHeight - faucet.delayBlocks,
      "and:toHeight"  : this.curHeight
    });

    const allTxs = inTxs.concat(outTxs);
    // Reverse sort from most recent to least
    allTxs.sort((a, b) => b.height - a.height);
    let tmpBalance = new BigNumber(balance);
    for (let tx of allTxs) {
      if (tx.senderId === this.address) {
        // out tx.
        tmpBalance = tmpBalance.plus(tx.amount);
      } else {
        tmpBalance = tmpBalance.minus(tx.amount);
      }
      if (tmpBalance.lt(faucet.minWalletAmount)) {
        return {
          error: true,
          msg  : `You had a balance lower than ${faucet.minWalletAmount} within last ${faucet.delayBlocks}`
        }
      }
    }

    return {
      error: false,
      msg  : 'You kept minimum amount threshold for the whole period.'
    }
  }

  /**
   * Checks if user have unvoted one of the members in the delayblocks period
   */
  private async checkIfUserUnvotedMembersWithinPeriod(): Promise<{ error: boolean, msg: string }> {
    const {transactions} = await this.api.transactions.getList({
      senderId        : this.address,
      "and:type"      : TransactionType.VOTE,
      "and:fromHeight": this.curHeight - faucet.delayBlocks,
      "and:toHeight"  : this.curHeight
    });

    const membersPubKey = await Promise.all(
      members.map(m => this.api.delegates
        .getByUsername(m.name)
        .then(r => r.delegate.publicKey)
      )
    );

    const deletedVotes = (await Promise.all(transactions
        .map(tx => this.api.transactions.get(tx.id)
          .then(r => r.transaction['votes']['deleted'])))
    ).reduce((a, b) => a.concat(b), []);

    for (let mPK of membersPubKey) {
      if (deletedVotes.indexOf(mPK) !== -1) {
        return {
          error: true,
          msg  : `You removed a vote to at least one of lig members during last ${faucet.delayBlocks} blocks`
        }
      }
    }
    return {
      error: false,
      msg  : null
    }
  }
}