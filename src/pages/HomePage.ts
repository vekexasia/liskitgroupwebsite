import Vue from 'vue';
import Component from 'vue-class-component';
import {
  EventsComponent,
  BlockRewardComponent,
  WhatOrWhoComponent,
  FuligComponent } from '../components'

@Component({
  components: {
    "v-blockreward": BlockRewardComponent,
    "v-whatorwho"  : WhatOrWhoComponent,
    "v-fulig"      : FuligComponent,
    "v-events"      : EventsComponent
  }
})
export default class IndexPage extends Vue {

  async mounted() {

  }

}
