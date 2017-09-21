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
      <h2>LIG's Faucet</h2>
      <md-divider></md-divider>
      <img src="../assets/img/faucet.jpg" style="max-width: 40%; margin: 0px auto; display:block;"
           alt="LIG faucet logo">
      <p><abbr title="Lisk Italian Group">LIG</abbr> members have decided to create a Faucet to get you real LISK.</p>
      <strong>How does it work?</strong>
      <p>Every 4 weeks you'll be able to claim 1 <span style="font-weight:300">LISK</span>
        by simply using the form below.</p>
      <p>In order to ensure high quality service you'll need to:</p>
      <ul>
        <li>Vote for all 10 LIG delegates</li>
        <li>Have at least {{faucetConfig.minWalletAmount}} LSK in your address</li>
      </ul>
      <p>
        Every ~4 weeks you'll be able to receive up to 1LSK if you maintained the requirements mentioned above for the whole period.</p>
      <p>Use the form below to check requirements and request a withdraw.</p>
      <md-divider></md-divider>
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
                       @click.native="doWithdraw()"
                       style="margin-top:10px;" :disabled="!validAddress || withdrawing || checking">
              Get Reward
            </md-button>
          </div>
        </md-layout>
      </md-layout>
      <md-progress md-indeterminate v-if="checking"/>
      <div v-if="!checking">
        <span v-if="error"><md-icon>warning</md-icon> {{error}}</span>
      </div>
      <div v-if="withdrawing">
        <p>Preparing your faucet reward</p>
        <md-progress md-indeterminate/>
      </div>
      <div v-else-if="withdrawRes">
        <span v-if="withdrawRes.err"><md-icon>warning</md-icon> {{withdrawRes.msg}}</span>
        <span v-else><md-icon>check</md-icon> Transaction successful! -> <a
            :href="viewUtils.explorerTxLink(withdrawRes.txID)">{{withdrawRes.txID}}</a></span>
      </div>


    </section>


  </div>
</template>
<script lang="ts" src="./FaucetPage.ts"/>
<style lang="scss">
  .poolpage {
    padding-bottom: 96px;
    img.logo {
      width: 108px;
      height: 150px;
    }
  }
</style>
