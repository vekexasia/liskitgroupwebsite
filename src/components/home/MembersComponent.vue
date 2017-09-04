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
        <div :class="{single_member: true, greyed: greyed && greyed.indexOf(idx) !== -1}" class="md-align-center">
          <md-tooltip md-direction="top">{{m.name}}</md-tooltip>
          <a :href="m.link" target="_blank" :title="m.name">
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
  .single_member {
    text-align:center;width:100%;margin-top:24px;
    &.greyed {
      opacity: 0.5;
      -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
      filter: grayscale(100%);
      text-decoration: line-through;
    }
  }
</style>
