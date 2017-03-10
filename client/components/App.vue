<template>
  <div id="app">
    <gradient-canvas name="canvas-interactive" default-state="home-state" :style="currentRoute != 'home' ? 'opacity: 1;' : 'opacity: 0;'"></gradient-canvas>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

  import GradientCanvas from 'components/GradientCanvas'

  export default {
    name: 'App',
    data () {
      return {
        currentRoute: this.$router.currentRoute.name
      }
    },
    components: {
      GradientCanvas
    },
    watch: {
      $route () {
        this.currentRoute = this.$route.name
      }
    }
  }

</script>

<style lang="scss">

  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,200i,300,300i,400i,600,600i,700,700i,900,900i');

  body {
    margin: 0;
    font-size: 2rem;
    font-family: 'Source Sans Pro', sans-serif;
  }
  .page {
    text-align: center;
  }
  code {
    background-color: #f0f0f0;
    padding: 3px 5px;
    border-radius: 2px;
  }

  .fade-enter-active, .fade-leave-active {
    -webkit-transition: opacity .5s ease-in-out;
    -moz-transition: opacity .5s ease-in-out;
    -o-transition: opacity .5s ease-in-out;
    transition: opacity .5s ease-in-out;
  }

  .fade-enter, .fade-leave-to, .fade-leave-active {
    opacity: 0
  }

  * {
    user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

</style>
