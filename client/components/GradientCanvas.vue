<template>
  <canvas id="canvas-interactive"></canvas>
</template>

<script>

  import Granim from 'granim'

  export default {
    name: 'GradientCanvas',
    mounted () {
      var granimInstance = new Granim({
         element: '#canvas-interactive',
         name: 'canvas-interactive',
         opacity: [1, 1],
         states : {
             "default-state": {
                 gradients: [
                     ['#834D9B', '#D04ED6'],
                     ['#1CD8D2', '#93EDC7']
                 ]
             }
         }
      })
    }
  }

</script>

<style scoped>

  #canvas-interactive {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
  }

</style>
