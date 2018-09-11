import Vue from 'vue';
import Component from 'vue-class-component';
import {
  MembersComponent,
} from '../components'
import {members} from '../models';
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
    // const memberVoters = await Promise.all(
    //   members.map(m => liskApi.delegates.get({username: m.name})
    //     .then(d => liskApi.delegates.getVoters(d.delegate.publicKey))
    //     .then(({ accounts }) => accounts)
    //   )
    // );
    // const membersVoted = memberVoters
    //   .map(voters => voters
    //     .some((v) => v.address === this.userAddress)
    //   );

    this.unvotedMembers = [];
    this.votedMembers   = [];
    // for (let i = 0; i < membersVoted.length; i++) {
    //   if (membersVoted[i]) {
    //     this.votedMembers.push(members[i].name);
    //   } else {
    //     this.greyedMembers.push(i);
    //     this.unvotedMembers.push(members[i].name);
    //   }
    // }
    this.checking = false;

  }

}
