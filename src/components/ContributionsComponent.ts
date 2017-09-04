import Vue from 'vue';
import Component from 'vue-class-component';
import { Contribution, contributions } from '../models';
@Component({})
export default class ContributionsComponent extends Vue {
  contributions = contributions;
}
