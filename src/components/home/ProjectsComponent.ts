import Vue from 'vue';
import Component from 'vue-class-component';
import { Project, projects } from '../../models';
@Component({})
export default class InitiativesComponent extends Vue {
  projects = projects;
  clickProj(p:Project) {
    window.open(p.repository, `_blank`);
  }
}
