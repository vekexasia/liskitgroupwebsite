<template>
  <div id="app">
    <md-toolbar>
      <div style="flex-direction: row; display:flex; width:100%; max-width: 1200px; margin: 0px auto;">
        <router-link tag="md-button" to="/" class="md-icon-button">
          <md-tooltip>Navigate to HomePage</md-tooltip>
          <md-icon  md-src="../assets/img/logo_only.svg"></md-icon>
        </router-link>

        <h2 class="md-title md-title-large" style="flex: 1; line-height: 48px">
          <span style="font-weight: 300">Lisk</span>
          <span style="font-weight: 600">Italian</span>
          <span style="font-weight: 300">Group</span>
        </h2>
        <h2 class="md-title md-title-small" style="flex: 1; line-height: 48px">
          <span style="font-weight: 600">LIG</span>
        </h2>
        <router-link tag="md-button" to="pool">
          <md-tooltip>Check FULIG Pool</md-tooltip>
          Pool
        </router-link>
        <router-link tag="md-button" to="faucet">
          <md-tooltip>LIG Faucet</md-tooltip>
          Faucet
        </router-link>


      </div>
    </md-toolbar>
    <transition name="fade" appear>
      <router-view></router-view>
    </transition>
  </div>
</template>
<script lang="ts" src="./AppComponent.ts"/>
<style lang="scss">
  @import '~vue-material/src/core/stylesheets/variables.scss';
  @import '~vue-material/dist/vue-material.css';

  .md-title-small {
    @media all and (max-width: $breakpoint-xsmall) {
      display: block;
    }
    @media all and (min-width: $breakpoint-xsmall+1) {
      display: none;
    }
  }
  .md-title-large {
    @media all and (max-width: $breakpoint-xsmall) {
      display: none;
    }
  }
  .md-whiteframe {
    background: #fafafa;
  }

  .fade-enter-active, .fade-leave-active {
    transition-property: opacity;
    transition-duration: .25s;
  }

  .fade-enter-active {
    transition-delay: .25s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  body {
    font-weight: 300;
  }

  .md-whiteframe {
    width: 100%;
    padding: 8px 16px 16px;
    margin-bottom: 16px;
    margin-top: 8px;
  }

  .main-content {
    padding: 16px;
    margin: 0px auto;
    max-width: 1200px;
  }

  section {
    margin-top: 48px;
    h1 .md-icon {
      font-size: 1em;
      margin-bottom: 2px
    }
  }

  a {
    color: #313131;
  }

</style>
