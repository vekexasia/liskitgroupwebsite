import Vue from 'vue';
import Component from 'vue-class-component';
import { members } from '../../models';
@Component({
  props: {
    greyed: Array,
    withFulig: Boolean
  }
})
export default class MembersComponent extends Vue {
  members = members;
  greyed: number[];
  withFulig: boolean;
  mounted() {
    if (this.withFulig && members[members.length-1].name !== 'fulig') {
      members.push({
        name: 'fulig',
        description: '',
        link: '/',
        img: 'logo.svg'
      });
    }
  }
}
