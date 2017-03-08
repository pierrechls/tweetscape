<template>
  <div id="renderer" :class="isLoaded ? 'show' : 'hide' ">
    <a-scene gridhelper="size: 3000; divisions: 1000">
      <assets></assets>
      <!-- tweets -->
      <tweet v-for="tweet in visibleTweets" :key="tweet.id" :position="tweet.position" :rotation="tweet.rotation" :tweet="tweet"></tweet>
      <!-- /tweets -->
      <camera :position="camera.position"></camera>
      <a-sky src="#gradient-skybox"></a-sky>
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

  import { getTweetsFromAPI } from 'store/api'

  let cycleTweetsInterval = null

  export default {
    name: 'Renderer',
    components: {
      'camera': Camera,
      'assets': Assets,
      'tweet': Tweet
    },
    data: () => {
      return {
        tweetsToRender: [],
        isLoaded: false,
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
      },
      visibleTweets: function () {
        return this.tweetsToRender.filter((tweet) => {
          return Math.abs(tweet.position.z) > (Math.abs(this.camera.position.z) - 5)
        })
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

        if(this.tweetsToRender.length % 2 == 0) {
            tweet.position = PathCalculator.after(this.pathParams.separator, 'left')
            tweet.rotation = { x: SimulationParams.tweetRotation.x, y: -SimulationParams.tweetRotation.y, z: SimulationParams.tweetRotation.z }
        } else {
          tweet.position = PathCalculator.after(this.pathParams.separator, 'right')
          tweet.rotation = { x: SimulationParams.tweetRotation.x, y: SimulationParams.tweetRotation.y, z: SimulationParams.tweetRotation.z }
        }

        this.$store.dispatch('removeFirstTweet')
        this.pathParams.separator += SimulationParams.tweetSeparator
        this.tweetsToRender.push(tweet)

        if(this.tweets.length < 5 ) {
            getTweetsFromAPI()
              .then( () => {
                this.$store.dispatch('updateTweets')
            })
        }

      }
    },
    mounted () {
      PathCalculator.setAmplitude(Random.getRandomInt(SimulationParams.pathAmplitude.x.min, SimulationParams.pathAmplitude.x.max), Random.getRandomInt(SimulationParams.pathAmplitude.y.min, SimulationParams.pathAmplitude.y.max))
      PathCalculator.setFrequency(Random.getRandomInt(SimulationParams.pathFrequency.x.min, SimulationParams.pathFrequency.x.max) + Math.random()*2, Random.getRandomInt(SimulationParams.pathFrequency.y.min, SimulationParams.pathFrequency.y.max) + Math.random()*2)

      cycleTweetsInterval = setInterval(this.cycleTweets, 1000)

      const scene = this.$el.querySelector('a-scene')
      if (scene.hasLoaded) {
        this.isLoaded = true
        this.buildSplineAndRun()
      } else {
        scene.addEventListener('loaded', () => {
          this.isLoaded = true
          this.buildSplineAndRun()
        })
      }
    },
    beforeDestroy () {
      clearInterval(cycleTweetsInterval)
    }
  }

</script>

<style lang="scss" scoped>

  #renderer {
    transition: opacity .5s;

    &.show {
      opacity: 1;
    }

    &.hide {
      opacity: 0;
    }

  }

</style>
