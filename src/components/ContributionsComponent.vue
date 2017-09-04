<template>
  <section>
    <h1><md-icon>thumb_up</md-icon> Contributions</h1>
    <md-divider></md-divider>
    <p>Contributions, bug and pull requests to external projects related to the <strong>Lisk ecosystem</strong> or to the <strong>Lisk core software</strong>.</p>
    <md-table>
      <md-table-header>
        <md-table-row>
          <md-table-head>Repo</md-table-head>
          <md-table-head>Description</md-table-head>
          <md-table-head>Date</md-table-head>
          <md-table-head>Author</md-table-head>
          <md-table-head>Link</md-table-head>
        </md-table-row>
      </md-table-header>
      <md-table-body>
        <md-table-row v-for="(c, idx) in contributions" v-bind:key="idx">
          <md-table-cell style="font-weight:600">{{c.repository}}</md-table-cell>
          <md-table-cell>{{c.title}}</md-table-cell>
          <md-table-cell>{{c.date}}</md-table-cell>
          <md-table-cell>{{c.authors.join(', ')}}</md-table-cell>
          <md-table-cell><a :href="c.uri" target="_blank"><md-icon>open_in_browser</md-icon></a></md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
  </section>
</template>
<script lang="ts" src="./ContributionsComponent.ts"/>
<style lang="scss">
  .proj_data {
    margin-left: 8px;
  }
</style>
