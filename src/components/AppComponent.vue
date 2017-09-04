<template>
  <div id="app">
    <transition name="fade" appear>
      <router-view></router-view>
    </transition>
  </div>
</template>
<script lang="ts" src="./AppComponent.ts"/>
<style lang="scss">
  /*@import '~vue-material/src/core/stylesheets/variables.scss';*/
  @import '~vue-material/dist/vue-material.css';

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
