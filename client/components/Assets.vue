<template>
  <a-assets>
    <img id="gradient-skybox" :src="gradientSkybox">
  </a-assets>
</template>

<script>

  export default {
    name: 'Assets',
    data: () => {
      return {
        gradientSkybox: ''
      }
    },
    mounted () {
      let homeGradientCanvas = document.querySelector('#canvas-interactive')
      this.gradientSkybox = homeGradientCanvas.toDataURL()
    }
  }

</script>
