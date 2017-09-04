import Vue from 'vue';
import Component from 'vue-class-component';
import { members } from '../../models';

@Component({
  components: {}
})
export default class WhatOrWhoComponent extends Vue {
  membersCount: number = members.length;
}
