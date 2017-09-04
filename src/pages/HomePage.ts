import Vue from 'vue';
import Component from 'vue-class-component';
import {
  EventsComponent,
  BlockRewardComponent,
  WhatOrWhoComponent,
  FuligComponent,
  ProjectsComponent
} from '../components'

@Component({
  components: {
    "v-blockreward": BlockRewardComponent,
    "v-whatorwho"  : WhatOrWhoComponent,
    "v-fulig"      : FuligComponent,
    "v-events"     : EventsComponent,
    "v-projects": ProjectsComponent
  }
})
export default class IndexPage extends Vue {

  async mounted() {

  }

}
