import Vue from 'vue';
import Component from 'vue-class-component';
import { BlockRewardComponent, WhatOrWhoComponent, FuligComponent } from '../components'

@Component({
  components: {
    "v-blockreward": BlockRewardComponent,
    "v-whatorwho"  : WhatOrWhoComponent,
    "v-fulig"      : FuligComponent
  }
})
export default class IndexPage extends Vue {

  async mounted() {

  }

}
