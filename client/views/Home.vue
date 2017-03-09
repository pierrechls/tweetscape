<template>
  <div class="view-home">
    <div id="gradient-logo" :class="showLogo ? '' : 'hide'">
      <gradient-canvas name="canvas-interactive-logo" default-state="home-state"></gradient-canvas>
      <div class="mask">
        <img src="~assets/logo-mask.svg">
      </div>
    </div>
  </div>
</template>

<script>

  import GradientCanvas from 'components/GradientCanvas'

  export default {
    name: 'Home',
    data () {
      return {
        showLogo: false
      }
    },
    components: {
      GradientCanvas
    },
    beforeRouteLeave (to, from, next) {
      this.showLogo = false
      setTimeout( () => {
        next()
      }, 1 * 1000)
    },
    beforeDestroy () {
      this.showLogo = false
    },
    mounted () {

      // show logo
      setTimeout( () => {
        this.showLogo = true
      }, 1 * 1000)

      // redirect to hashtag view
      setTimeout( () => {
        this.$router.push({ path: '/hashtag' })
      }, 4 * 1000)

    }
  }

</script>

<style lang="scss" scoped>

  .view-home {

    #gradient-logo {
      opacity: 1;
      -webkit-transition: opacity .5s ease-in-out;
      -moz-transition: opacity .5s ease-in-out;
      -o-transition: opacity .5s ease-in-out;
      transition: opacity .5s ease-in-out;

      .mask {
        position: absolute;
        width: 10rem;
        height: 10rem;
        top: 50%;
        left: 50%;
        margin-top: -5rem;
        margin-left: -5rem;

        img {
          width: 100%;
          height: 100%;
        }

      }

      canvas {
        &#canvas-interactive-logo {
          position: absolute;
          display: block;
          width: 10rem;
          height: 10rem;
          top: 50%;
          left: 50%;
          margin-top: -5rem;
          margin-left: -5rem;
          z-index: -1;
          -webkit-transition: opacity .5s ease-in-out;
          -moz-transition: opacity .5s ease-in-out;
          -o-transition: opacity .5s ease-in-out;
          transition: opacity .5s ease-in-out;
        }
      }

      &.hide {
        opacity: 0;
      }

    }
  }

</style>
