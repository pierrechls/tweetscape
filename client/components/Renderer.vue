<template>
  <div id="renderer">
    <button @click="$store.dispatch('addTweet', {})">ADD TWEET</button>
    <a-scene gridhelper="size: 3000;">
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
            x: 20,
            y: 30,
            z: 10
          },
          rotation: {
            x: 0,
            y: 0,
            z: 0
          }
        },
        paths: [],
        pathParams: {
          amplitude: {
            x: 0,
            y: 0
          },
          frequency: {
            x: 0,
            y: 0
          },
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
        this.pathParams.amplitude.x = this.pathParams.amplitude.x || Random.getRandomInt(10, 30)
        this.pathParams.amplitude.y = this.pathParams.amplitude.y || Random.getRandomInt(10, 30)

        this.pathParams.frequency.x = this.pathParams.frequency.x || Random.getRandomInt(1, 2) + Math.random()*2
        this.pathParams.frequency.y = this.pathParams.frequency.y || Random.getRandomInt(1, 2) + Math.random()*2

        const amplX = this.pathParams.amplitude.x
        const amplY = this.pathParams.amplitude.y
        const freqX = this.pathParams.frequency.x
        const freqY = this.pathParams.frequency.y

        let tempPaths = []
        for(let i = this.pathParams.offset; i < SimulationParams.path_amount_per_cycle + this.pathParams.offset ; ++i) {
          let x = amplX*Math.sin(freqX*i*3.1415926535/180)
          let y = amplY*Math.sin(freqY*i*3.1415926535/180)
          let z = -i
          tempPaths.push({x: x, y: y, z: z})
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
      this.buildSplineAndRun()
    }
  }

</script>

<style>

</style>
