import Vue from 'vue';
import Component from 'vue-class-component';
import { members } from '../../models';
@Component({})
export default class MembersComponent extends Vue {
  members = members;

}
