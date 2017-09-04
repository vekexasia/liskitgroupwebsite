<template>
  <p style="font-weight:300">The next block reward change will happen in <strong>{{days}}</strong><sub>d</sub> <strong>{{hours}}</strong><sub>h</sub> <strong>{{minutes}}</strong><sub>m</sub> <strong>{{seconds}}</strong><sub>s</sub> at block height <strong>{{blockHeight}}</strong>. New reward will be <strong>{{newReward}} <span style="font-weight:300">LISK</span></strong>.
    <br>If there were no missing block between now and the changing block, it will happen the <strong>{{date}} UTC</strong>.
  </p>
</template>
<script lang="ts" src="./BlockRewardComponent.ts"/>
<style lang="scss">
</style>
