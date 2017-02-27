<template>
  <div class="timeline">
    <renderer></renderer>
  </div>
</template>

<script>

  import Renderer from 'components/Renderer'

  export default {
    name: 'Home',
    components: {
      Renderer
    },
    computed: {
      gradient: function () { return this.$store.state.granimGradients.filter(function(item) { return item.name === 'canvas-interactive-home'}) }
    },
    mounted () {
      TweenMax.fromTo('.timeline', 0.5, { opacity: 0 }, { opacity: 1 }).delay(1.5)
      console.log('GRADIENT', this.gradient)
    }
  }

</script>

<style lang="scss" scoped>

  .timeline {
    opacity: 0;
  }

</style>
