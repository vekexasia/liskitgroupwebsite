<template>
  <div class="main-content">
    <!-- header -->
    <md-layout md-column>
      <md-layout md-align="center">
        <img src="../assets/img/logo.svg" class="logo"/>
      </md-layout>
      <md-layout md-align="center" style="font-size:2.5em; margin-top: 32px">
        <span style="font-weight:300">Lisk <span style="font-weight:600">Italian</span> Group</span>
      </md-layout>
      <md-layout style="margin-top: 32px;" md-align="center">
        <v-blockreward></v-blockreward>
      </md-layout>
    </md-layout>
    <v-whatorwho></v-whatorwho>
    <v-fulig></v-fulig>
    <v-events></v-events>
  </div>
</template>
<script lang="ts" src="./HomePage.ts"/>
<style lang="scss">
  .logo {
    width: 150px;
  }
</style>
