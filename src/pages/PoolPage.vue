<template>
  <div class="main-content poolpage">
    <!-- header -->
    <md-layout md-column>
      <md-layout md-align="center" style="padding-top:64px">
        <router-link to="/">
          <md-tooltip md-direction="top">Visit homepage</md-tooltip>
          <img src="../assets/img/logo.svg" class="logo"/>
        </router-link>
      </md-layout>
      <!--<md-layout md-align="center" style="padding:32px;">-->
      <!--<img src="../assets/img/pool_slides.jpg" class="pool"/>-->
      <!--</md-layout>-->
    </md-layout>
    <section>
      <h2>FULIG Pool</h2>
      <md-divider></md-divider>
      <p><abbr title="Lisk Italian Group">LIG</abbr> members has decided to convert fulig delegate into a pool.</p>
      <p>fulig pool shares <strong>25%</strong> to all voters and <strong>90%</strong> to whom also votes for all lig members.</p>
      <p><strong>Vote for fulig</strong> and start receiving weekly payouts as soon as fulig is in active position. Enter your address below and check your voting status.</p>
    </section>
    <section>
      <h2>FULIG Pool Reward Check</h2>
      <md-divider></md-divider>
      <p>Vote for all {{members.length}} <strong>LIG</strong> members and get 90% of forged LSK</p>
      <form>
        <md-layout>
          <md-layout md-flex="60">
            <md-input-container v-bind:class="{'md-input-invalid':!validAddress && userAddress != ''}">
              <label>Your Address</label>
              <md-input v-model="userAddress"></md-input>
              <span class="md-error">Address is invalid!</span>
            </md-input-container>
          </md-layout>
          <md-layout md-flex="40" md-align="center">
            <div style="margin-left: auto;">
              <md-button class="md-raised md-primary"
                         @click.native="doCheck()"
                         style="margin-top:10px;" :disabled="!validAddress">Check
              </md-button>
            </div>
          </md-layout>
        </md-layout>
      </form>
      <md-progress md-indeterminate v-if="checking"/>
      <div v-if="!checking">
        <span v-if="unvotedMembers.length > 0"><md-icon>warning</md-icon> You didn't vote for: <strong>{{unvotedMembers.join(', ')}}</strong>. Vote for them to upgrade fulig share from 25% to 90% !!!</span>
      </div>
      <v-members :greyed="greyedMembers" :withFulig="true"></v-members>


    </section>

  </div>
</template>
<script lang="ts" src="./PoolPage.ts"/>
<style lang="scss">
  .poolpage {
    padding-bottom: 96px;
    img.logo {
      width: 108px;
      height: 150px;
    }
  }
</style>
