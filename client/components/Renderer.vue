<template>
  <div id="renderer">
    <a-scene gridhelper="size: 3000; colorGrid: green">
      <assets></assets>
      <!-- tweets -->
      <tweet v-for="tweet in tweets" :position="{x: 2, y: 3, z:3}" :tweet="tweet"></tweet>
      <!-- /tweets -->
      <camera :position="camera.position"></camera>
    </a-scene>
  </div>
</template>

<script>

  import Camera from './Camera.vue'
  import Assets from './Assets.vue'
  import Tweet from './Tweet.vue'

  import SimulationParams from '../params.js'
  import Vector3D from 'utils/maths/vector3d.js'
  import Random from 'utils/maths/random.js'
  import PathCalculator from 'utils/PathCalculator.js'

  export default {
    name: 'Renderer',
    components: {
      'camera': Camera,
      'assets': Assets,
      'tweet': Tweet
    },
    data: () => {
      return {
        camera: {
          position: {
            x: 0,
            y: 0,
            z: 0
          },
          rotation: {
            x: 0,
            y: 0,
            z: 0
          }
        },
        paths: [],
        pathParams: {
          offset: 0
        },
        lastPath: {
          x: 0,
          y: 0,
          z: 0
        }
      }
    },
    computed: {
      tweets() {
        return this.$store.state.tweets
      }
    },
    methods: {
      drawPath: function () {
        let pathCalculator = new PathCalculator()

        let tempPaths = []
        for(let i = this.pathParams.offset; i < SimulationParams.path_amount_per_cycle + this.pathParams.offset; ++i) {

          tempPaths.push(PathCalculator.at(i))
        }

        this.paths = tempPaths
        this.pathParams.offset += SimulationParams.path_amount_per_cycle
        /*
        For i in MAX_POINTS, draw points following math formulas
         */
      },
      initLastPath: function () {
        this.lastPath = this.paths[0]
        // TODO : get paths[0] and paths[1], get coeff_dir, set as base camera rot
      },
      startSimulation: function () {
        TweenMax.to(this.camera.position, 20, { bezier: this.paths, ease: Linear.easeNone, repeat: 0, onComplete: this.buildSplineAndRun });
      },
      buildSplineAndRun: function() {
        this.drawPath()
        //this.startSimulation()
      }
    },
    mounted () {
      PathCalculator.setAmplitude(Random.getRandomInt(10, 30), Random.getRandomInt(10, 30))
      PathCalculator.setFrequency(Random.getRandomInt(1, 2) + Math.random()*2, Random.getRandomInt(1, 2) + Math.random()*2)
 
      this.buildSplineAndRun()
    }
  }

</script>

<style>

</style>
