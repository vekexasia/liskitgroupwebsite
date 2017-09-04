<template>
  <section>
    <h1><md-icon>date_range</md-icon> Events</h1>
    <md-divider></md-divider>
    <p>Events organized by us.</p>
    <p>If you are getting our slides for your Lisk events remember to mention our delegated and ask us permission.</p>
    <md-table>
      <md-table-header>
        <md-table-row>
          <md-table-head></md-table-head>
          <md-table-head>Title</md-table-head>
          <md-table-head>Date</md-table-head>
          <md-table-head>Location</md-table-head>
          <md-table-head>Attachments</md-table-head>
          <md-table-head>Link</md-table-head>
        </md-table-row>
      </md-table-header>
      <md-table-body>
        <md-table-row v-for="(event, idx) in events" v-bind:key="idx">
          <md-table-cell style="font-weight:600">{{event.type}}</md-table-cell>
          <md-table-cell>{{event.title}}</md-table-cell>
          <md-table-cell>{{event.date}}</md-table-cell>
          <md-table-cell>{{event.location}}</md-table-cell>
          <md-table-cell>
            <a target="_blank" :href="`assets/materials/${event.pdf}`" v-if="event.pdf">PDF</a>
            <a target="_blank" :href="`assets/materials/${event.ppt}`" v-if="event.ppt">PPT/KEY</a>
          </md-table-cell>
          <md-table-cell><a :href="event.uri" target="_blank"><md-icon>open_in_browser</md-icon></a></md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
  </section>
</template>
<script lang="ts" src="./EventsComponent.ts"/>
<style lang="scss">
</style>
