<template>
  <canvas :id="name" class="canvas-interactive"></canvas>
</template>

<script>

  import Granim from 'granim'

  export default {
    name: 'GradientCanvas',
    props: {
      name: {
        type: String,
        required: true
      },
      defaultState: {
        type: String,
        required: true
      }
    },
    mounted () {

      let granimInstance = new Granim({
         element: `#${this.name}`,
         name: this.name,
         direction: 'top-bottom',
         defaultStateName: this.defaultState,
         opacity: [1, 1],
         states : {
             'home-state': {
                 gradients: [
                     ['#141E30', '#243B55'],
                     ['#0D1523', '#15283C']
                 ]
             },
             'timeline-state': {
                 gradients: [
                     ['#0D1523', '#15283C']
                 ]
             }
         }
      })

      this.$store.dispatch('addGranimGradient', granimInstance)


    }
  }

</script>

<style scoped>

  .canvas-interactive {
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
