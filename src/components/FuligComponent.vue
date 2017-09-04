<template>
  <section>
    <h1><md-icon>info</md-icon> Fulig overview</h1>
    <md-divider></md-divider>
    <md-layout md-gutter="16">
      <md-layout>
        <md-whiteframe md-elevation="4">
          <h2>Last in txs</h2>
          <md-divider></md-divider>
          <div class="item" v-for="(item, idx) in inTxItems" v-bind:key="idx">
            <a :href="item.link" target="_blank">
              <md-icon>{{item.icon}}</md-icon>
              <span class="label">{{item.label}}</span>
              <div class="value">{{item.value}}</div>
            </a>
          </div>
        </md-whiteframe>
      </md-layout>
      <md-layout>
        <md-whiteframe md-elevation="4">
          <h2>FULIG</h2>
          <md-divider></md-divider>
          <div class="item" v-for="(item, idx) in fuligItems" v-bind:key="idx">
            <md-icon>{{item.icon}}</md-icon>
            <span class="label">{{item.label}}</span>
            <div class="value">{{item.value}}</div>
          </div>
        </md-whiteframe>
      </md-layout>

      <md-layout>
        <md-whiteframe md-elevation="4">
          <h2>Last out txs</h2>
          <md-divider></md-divider>
          <div class="item" v-for="(item, idx) in outTxItems" v-bind:key="idx">
            <a :href="item.link" target="_blank">
              <md-icon>{{item.icon}}</md-icon>
              <span class="label">{{item.label}}</span>
              <div class="value">{{item.value}}</div>
            </a>
          </div>
        </md-whiteframe>
      </md-layout>
    </md-layout>
  </section>
</template>
<script lang="ts" src="./FuligComponent.ts"/>
<style lang="scss">
  .item {
    text-decoration: none;
    i.md-icon {
      margin-right: 16px;
    }
    .value {
      float: right;
    }
    margin: 8px 0px;
  }
</style>
