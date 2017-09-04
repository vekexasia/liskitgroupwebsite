import Vue from 'vue';
import Component from 'vue-class-component';
import { baseConfig, members } from '../../models';
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
    const {account}  = await liskApi.accounts.getAccount(baseConfig.fuligAddress);
    const {delegate} = await liskApi.delegates.getByPublicKey(account.publicKey);
    this.fuligItems.push({
      icon : 'attach_money',
      label: 'Balance',
      value: new BigNumber(account.balance).div(Math.pow(10, 8)).trunc().toString(),
    });

    this.fuligItems.push({
      icon : 'show_chart',
      label: 'Rank',
      value: delegate.rate
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
      value: '75%'
    });



    const [inTxs, outTxs] = await Promise.all([
      liskApi.transactions.getList({
        recipientId: baseConfig.fuligAddress,
        orderBy    : 'height:desc',
        limit      : 7
      }),
      liskApi.transactions.getList({
        senderId: baseConfig.fuligAddress,
        orderBy : 'height:desc',
        limit   : 7
      })
    ]);

    const inTxsSenders     = await Promise.all(inTxs.transactions.map(async tx => cachedPubKeyToUserName(tx.senderPublicKey, tx.senderId)));
    const outTxsRecipients = await Promise.all(outTxs.transactions.map(async tx => cachedAddressToUserName(tx.recipientId, tx.recipientId)));

    this.inTxItems = inTxs.transactions.map((tx, idx) => {
      return {
        icon : 'trending_down',
        label: inTxsSenders[idx],
        value: new BigNumber(tx.amount).div(Math.pow(10, 8)).toFixed(2) + ' LSK',
        link : viewUtils.explorerTxLink(tx.id)
      }
    });

    this.outTxItems = outTxs.transactions.map((tx, idx) => {
      return {
        icon : 'trending_up',
        label: outTxsRecipients[idx],
        value: new BigNumber(tx.amount).div(Math.pow(10, 8)).toFixed(2) + ' LSK',
        link : viewUtils.explorerTxLink(tx.id)
      }
    });

  }


}