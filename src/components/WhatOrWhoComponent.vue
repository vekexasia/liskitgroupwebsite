<template>
  <section>
    <h1><md-icon>volume_up</md-icon> What or Who?</h1>
    <md-divider></md-divider>
    <p>
      The <strong>LIG</strong> is composed by {{membersCount}} Italian delegates working for the Lisk environment since March-April 2016 (after the end of Lisk ICO).<br>
      Everyone is putting its own skills at disposal to improve Lisk everyday.<br><br>
      Our <strong>goal</strong> is to fund projects related to Lisk like <strong>B-Apps</strong> (aka blockchain apps) or tools designed by us.<br>
      We aim at reporting news and releases about  those projects to the community.<br><br>
      With the multi-signature address <a :href="viewUtils.explorerDelegateLink(baseConfig.fuligAddress)"><i class="ng-binding">{{baseConfig.fuligAddress}}</i></a> we’re going to create an <strong>official fund</strong> named <strong>FULIG</strong> to support these projects.
      Each month LIG members (and all Liskers who want) will be free to donate a percentage of their forged Lisk to the fund. The FULIG will vote all most recent 101 donors.
      <br><br>
      The FULIG is also a 90% <b>pool</b>, check the dedicated page: <router-link to="pool">FULIG Pool page</router-link>.
    </p>
  </section>
</template>
<script lang="ts" src="./WhatOrWhoComponent.ts"/>
<style lang="scss">
</style>
