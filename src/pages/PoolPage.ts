import Vue from 'vue';
import Component from 'vue-class-component';
import {
  MembersComponent,
} from '../components'
import axios from 'axios';
import {members, baseConfig} from '../models';
import {liskApi} from '../utils';

@Component({
  components: {
    "v-members"      : MembersComponent
  }
})
export default class PoolPage extends Vue {
  members                  = members;
  userAddress: string      = '';
  checking                 = false;
  results                  = null;
  greyedMembers: number[]  = [];
  votedMembers: string[]   = [];
  unvotedMembers: string[] = [];

  async mounted() {

  }

  get validAddress() {
    return /^[0-9]{1,21}L$/.test(this.userAddress)
  }

  async doCheck() {
    this.checking      = true;
    this.greyedMembers = [];

    const res = await axios.get(`${baseConfig.nodeAddress}/api/votes/?address=${this.userAddress}&limit=101`);
    this.unvotedMembers = [];
    this.votedMembers   = [];

    if (res.data.data) {
      const votes = res.data.data.votes;
      const memberUsernames = members.map((m) => m.name);
      const votedMembers = votes.map((v) => v.username)
        .filter((u) => memberUsernames.indexOf(u) !== -1);

      for (let i=0; i< memberUsernames.length; i++) {
        const member = memberUsernames[i];
        if (votedMembers.indexOf(member) !== -1) {
          this.votedMembers.push(member);
        } else {
          this.greyedMembers.push(i);
          this.unvotedMembers.push(member);
        }

      }
    }
    this.checking = false;

  }

}
