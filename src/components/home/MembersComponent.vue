<template>
  <section>
    <h1>
      <md-icon>people</md-icon>
      Members
    </h1>
    <md-divider></md-divider>
    <p>All the <strong>Lisk Italian members</strong> that are <strong>actively</strong> contributing to the ecosystem.
    </p>
    <md-layout md-gutter="16">
      <md-layout v-for="(m,idx) in members" v-bind:key="idx" md-flex="20" md-flex-xsmall="50" style="margin-top:16px">
        <div style="text-align:center;width:100%;margin-top:24px;" class="md-align-center">
          <a :href="m.link" target="_blank">
            <md-avatar class="md-large" style="display:block">
              <img :src="`/assets/img/${m.img}`" :alt="m.name"/>
            </md-avatar>
          </a>
          <a style="display:block;margin-top:8px;" :href="m.link" target="_blank">{{m.name}}</a>
        </div>
      </md-layout>
    </md-layout>
  </section>
</template>
<script lang="ts" src="./MembersComponent.ts"/>
<style lang="scss">
  .proj_data {
    margin-left: 8px;
  }
</style>
