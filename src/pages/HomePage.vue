<template>
  <div class="main-content">
    <!-- header -->
    <md-layout md-column >
      <md-layout md-align="center">
        <img src="../assets/img/newlogo.png" class="logo"/>
      </md-layout>
      <md-layout md-align="center">
        <v-blockreward></v-blockreward>
      </md-layout>
    </md-layout>
    <v-members></v-members>
    <v-whatorwho></v-whatorwho>
    <v-fulig></v-fulig>
    <v-events></v-events>
    <v-projects></v-projects>
    <v-contributions></v-contributions>
    <div style="clear:both;padding-bottom:160px"></div>
  </div>
</template>
<script lang="ts" src="./HomePage.ts"/>
<style lang="scss">
  .logo {
    width: 350px;
    height: 350px !important;
  }
</style>
