<template>
  <div class="page">
    <counter></counter>
    <renderer></renderer>
  </div>
</template>

<script>

  import Counter from 'components/Counter'
  import Renderer from 'components/Renderer'

  export default {
    name: 'Home',
    components: {
      Counter,
      Renderer
    }
  }

</script>
