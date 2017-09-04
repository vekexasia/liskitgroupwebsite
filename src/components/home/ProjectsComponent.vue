<template>
  <section id="projects">
    <h1><md-icon>build</md-icon> Projects</h1>
    <md-divider></md-divider>
    <p>Project related to the <strong>Lisk ecosystem</strong> and developed by the <strong>LIG</strong> members</p>
    <md-layout md-gutter="16">
      <md-layout v-for="(p,idx) in projects" v-bind:key="idx" md-flex="25" md-flex-small="50" md-flex-xsmall="100" style="margin-top:16px">
        <md-card md-theme="default" md-with-hover style="width:100%" >
          <md-card-header>
            <div class="md-title">{{p.name}}</div>
            <div class="md-subhead">
              {{p.type}} &mdash;
              <md-chip :class="{'md-primary': p.stage==='production','md-warn': p.stage==='development'}">{{p.stage}}</md-chip> &mdash;
              {{p.license}}</div>
          </md-card-header>
          <md-card-content style="font-weight:normal; height: 48px;">
            {{p.description}}
          </md-card-content>
          <md-card-actions>
            <div class="proj_data">
              <md-icon>people</md-icon>&nbsp; {{p.authors.join(', ')}}<br/>
            </div>
            <div style="flex:1"></div>
            <md-button class="md-icon-button md-accent" @click.native="clickProj(p)">
              <md-tooltip>Open in GitHub</md-tooltip>
              <md-icon>open_in_browser</md-icon>
            </md-button>
          </md-card-actions>

        </md-card>
      </md-layout>
    </md-layout>
  </section>
</template>
<script lang="ts" src="./ProjectsComponent.ts"/>
<style lang="scss">
  .proj_data {
    margin-left: 8px;
  }
  #projects {
    div.md-chip {
      padding: 4px 6px;
      height: 24px;
    }
  }
</style>
