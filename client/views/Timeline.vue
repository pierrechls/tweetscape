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
    mounted () {
      TweenMax.fromTo('.timeline', 0.5, { opacity: 0 }, { opacity: 1 }).delay(1.5)
    }
  }

</script>

<style lang="scss" scoped>

  .timeline {
    opacity: 0;
  }

</style>
