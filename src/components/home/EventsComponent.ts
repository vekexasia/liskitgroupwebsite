import Vue from 'vue';
import Component from 'vue-class-component';
import { events } from '../../models';
@Component({
  components: {
  }
})
export default class IndexPage extends Vue {
  events = events;

}
