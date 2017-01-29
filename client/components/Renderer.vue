<template>
  <div id="renderer">
    <a-scene gridhelper="size: 3000; colorGrid: green">
      <assets></assets>
      <!-- tweets -->
      <tweet v-for="tweet in displayedTweets" :position="tweet.position" :tweet="tweet"></tweet>
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
        displayedTweets: [],
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
          offset: 0,
          separator: SimulationParams.pathAmountPerCycle/2
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
        for(let i = this.pathParams.offset; i < SimulationParams.pathAmountPerCycle + this.pathParams.offset; ++i) {
          tempPaths.push(PathCalculator.at(i))
        }

        this.paths = tempPaths
        this.pathParams.offset += SimulationParams.pathAmountPerCycle
        /*
        For i in MAX_POINTS, draw points following math formulas
         */
      },
      initLastPath: function () {
        this.lastPath = this.paths[0]
        // TODO : get paths[0] and paths[1], get coeff_dir, set as base camera rot
      },
      startSimulation: function () {
        TweenMax.to(this.camera.position, SimulationParams.speed, { bezier: this.paths, ease: Linear.easeNone, repeat: 0, onComplete: this.buildSplineAndRun })
      },
      buildSplineAndRun: function() {
        this.drawPath()
        this.startSimulation()
      },
      cycleTweets: function() {
        let tweet = this.tweets[0]
        console.log(PathCalculator.at(-this.camera.position.z, 30))
        tweet.position = PathCalculator.at(-this.camera.position.z, 30)
        this.$store.dispatch('removeFirstTweet')
        this.pathParams.separator += SimulationParams.tweetSeparator
        this.displayedTweets.push(tweet)
      }
    },
    mounted () {
      PathCalculator.setAmplitude(Random.getRandomInt(SimulationParams.pathAmplitude.x.min, SimulationParams.pathAmplitude.x.max), Random.getRandomInt(SimulationParams.pathAmplitude.y.min, SimulationParams.pathAmplitude.y.max))
      PathCalculator.setFrequency(Random.getRandomInt(SimulationParams.pathFrequency.x.min, SimulationParams.pathFrequency.x.max) + Math.random()*2, Random.getRandomInt(SimulationParams.pathFrequency.y.min, SimulationParams.pathFrequency.y.max) + Math.random()*2)

      this.buildSplineAndRun()

      setInterval(
        this.cycleTweets
        ,1000
      )
    }
  }

</script>

<style>

</style>
