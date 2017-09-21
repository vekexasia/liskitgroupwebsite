import Vue from 'vue';
import Component from 'vue-class-component';
import {
  MembersComponent,
} from '../components'
import { members, faucet } from '../models';
import { liskApi } from '../utils';
import BigNumber from 'bignumber.js';
import { FaucetChecker } from '../faucetChecks';
import * as firebase from 'firebase';

@Component({
  components: {
    "v-members": MembersComponent
  }
})
export default class PoolPage extends Vue {
  faucetConfig              = faucet;
  members                   = members;
  userAddress: string       = '';
  checking                  = false;
  error: string             = null;
  metRequirements: string[] = null;
  withdrawing: boolean      = null;
  withdrawRes: {err:boolean, msg: string, txID:string} = null;
  get validAddress() {
    return /^[0-9]{1,21}L$/.test(this.userAddress)
  }

  async doWithdraw() {
    this.checking    = true;
    this.error       = null;
    this.withdrawing = null;
    this.withdrawRes = null;
    const fchecks    = new FaucetChecker(liskApi, this.userAddress);
    try {
      this.metRequirements = await fchecks.performChecks();
    } catch (e) {
      this.checking = false;
      this.error = e.message;
      return;
    }
    this.checking = false;

    this.withdrawing = true;
    const ref = firebase.database().ref('faucetRequests').push({
      address: this.userAddress
    });

    firebase.database().ref('faucetResults').child(ref.key)
      .on('value', (ds: firebase.database.DataSnapshot) => {
        if (ds.exists()) {
          this.withdrawRes = ds.val();
          //ds.ref.set(null);
          this.withdrawing = false;
          firebase.database().ref('faucetResults').child(ref.key).off('value');
        }
      });
  }



}
