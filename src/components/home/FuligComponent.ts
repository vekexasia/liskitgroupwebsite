import Vue from 'vue';
import Component from 'vue-class-component';
import { baseConfig } from '../../models';
import { cachedAddressToUserName, cachedPubKeyToUserName, liskApi, viewUtils } from '../../utils';
import BigNumber from 'bignumber.js';

type Item = {
  icon: string
  label: string
  value: string | number
}
@Component({
  components: {}
})
export default class FuligComponent extends Vue {
  fuligItems: Item[] = [
    {icon: 'people', label: 'Delegate Name', value: 'fulig'},
    {icon: 'my_location', label: 'Address', value: baseConfig.fuligAddress}
  ];

  inTxItems: (Item & { link: string })[]  = [];
  outTxItems: (Item & { link: string })[] = [];

  async mounted() {
    const {data: accounts}  = await liskApi.accounts.get({address: baseConfig.fuligAddress});
    const [account] = accounts;
    const {data: delegates} = await liskApi.delegates.get({publicKey: accounts[0].publicKey});
    const [delegate] = delegates;

    console.log(accounts);
    console.log(delegate);
    this.fuligItems.push({
      icon : 'attach_money',
      label: 'Balance',
      value: new BigNumber(account.balance).div(Math.pow(10, 8)).trunc().toString(),
    });

    this.fuligItems.push({
      icon : 'show_chart',
      label: 'Rank',
      value: delegate.rank
    });

    this.fuligItems.push({
      icon : 'favorite',
      label: 'Votes',
      value: new BigNumber(delegate.vote).div(Math.pow(10, 8)).trunc().toString()
    });
    this.fuligItems.push({
      icon : 'assessment',
      label: 'approval',
      value: `${delegate.approval}%`
    });

    this.fuligItems.push({
      icon : 'share',
      label: 'Pool Share',
      value: '90%'
    });


    const [inTxs, outTxs] = await Promise.all([
      liskApi.transactions.get({
        recipientId: baseConfig.fuligAddress,
        sort       : 'timestamp:desc',
        limit      : 7
      }).then(({data}) => data),
      liskApi.transactions.get({
        senderId: baseConfig.fuligAddress,
        sort    : 'timestamp:desc',
        limit   : 7
      }).then(({data}) => data)
    ]);

    const inTxsSenders     = await Promise.all(inTxs.map(async tx => cachedPubKeyToUserName(tx.senderPublicKey, tx.senderId)));
    const outTxsRecipients = await Promise.all(outTxs.map(async tx => cachedAddressToUserName(tx.recipientId, tx.recipientId)));

    this.inTxItems = inTxs.map((tx, idx) => {
      return {
        icon : 'trending_down',
        label: inTxsSenders[idx],
        value: new BigNumber(tx.amount).div(Math.pow(10, 8)).toFixed(2) + ' LSK',
        link : viewUtils.explorerTxLink(tx.id)
      }
    });

    this.outTxItems = outTxs.map((tx, idx) => {
      return {
        icon : 'trending_up',
        label: outTxsRecipients[idx],
        value: new BigNumber(tx.amount).div(Math.pow(10, 8)).toFixed(2) + ' LSK',
        link : viewUtils.explorerTxLink(tx.id)
      }
    });

  }


}
