<template>
  <canvas :id="name" class="canvas-interactive" width="512" height="512"></canvas>
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
         direction: 'diagonal',
         defaultStateName: this.defaultState,
         opacity: [1, 1],
         states : {
             'home-state': {
                 gradients: [
                     ['#21c2cc', '#6b4bba'],
                     ['#229ea6', '#3f28b1']
                 ]
             },
             'timeline-state': {
                 gradients: [
                     ['#245170', '#2f3a65']
                 ]
             }
         }
      })

      this.$el.width = 512
      this.$el.height = 512

      this.$store.dispatch('addGranimGradient', { name: this.name, gradient: granimInstance })


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
