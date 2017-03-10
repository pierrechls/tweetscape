<template>
  <div id="renderer" :class="isLoaded ? 'show' : 'hide' ">
    <a-scene gridhelper="size: 3000; divisions: 1000">
      <assets></assets>
      <!-- tweets -->
      <tweet v-for="tweet in visibleTweets" :key="tweet.id" :position="tweet.position" :rotation="tweet.rotation" :tweet="tweet"></tweet>
      <!-- /tweets -->
      <camera :position="camera.position" :controls-enabled="controlsEnabled"></camera>
      <a-gradient-sky material="shader: gradient; topColor: 36 81 112; bottomColor: 47 58 101;"></a-gradient-sky>
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
        controlsEnabled: true,
        inProgress: true,
        isVR: false,
        tweetsToRender: [],
        isLoaded: false,
        experimentOngoing: true,
        camera: {
          position: { x: 0, y: 0, z: 0 }
        },
        paths: [],
        pathParams: {
          offset: 0,
          separator: SimulationParams.pathAmountPerCycle/2
        },
        lastPath: { x: 0, y: 0, z: 0 }
      }
    },
    computed: {
      hasHashtag () {
        return this.$store.state.hashtag ? true : false
      },
      tweets() {
        return this.$store.state.tweets
      },
      visibleTweets: function () {
        return this.tweetsToRender.filter((tweet) => {
          return (Math.abs(tweet.position.z) > (Math.abs(this.camera.position.z) - 5)) && (Math.abs(tweet.position.z) < (Math.abs(this.camera.position.z) + 50))
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
      },
      startSimulation: function () {
        TweenMax.to(this.camera.position, SimulationParams.speed, { bezier: this.paths, ease: Linear.easeNone, repeat: 0, onComplete: this.buildSplineAndRun })
      },
      buildSplineAndRun: function() {
        this.drawPath()
        this.startSimulation()
      },
      cycleTweets: function() {

        if(this.tweets.length > 0) {
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

          if(this.experimentOngoing && this.tweets.length < 5 ) {
              getTweetsFromAPI()
                .then(
                  () => this.$store.dispatch('updateTweets'),
                  () => this.experimentOngoing = false
                )
          }

        }

        if(this.visibleTweets.length == 0) {
          this.controlsEnabled = false
          document.querySelector('#msg-end').emit('fade')
          clearInterval(cycleTweetsInterval)
          let redirectToHome = setTimeout( () => {
            if(this.isVR) {
              this.$el.querySelector('a-scene').exitVR()
            }
            this.$router.push({ path: '/' })
          }, 5 * 1000)
        }

      }
    },
    mounted () {

      PathCalculator.setAmplitude(Random.getRandomInt(SimulationParams.pathAmplitude.x.min, SimulationParams.pathAmplitude.x.max), Random.getRandomInt(SimulationParams.pathAmplitude.y.min, SimulationParams.pathAmplitude.y.max))
      PathCalculator.setFrequency(Random.getRandomInt(SimulationParams.pathFrequency.x.min, SimulationParams.pathFrequency.x.max) + Math.random()*2, Random.getRandomInt(SimulationParams.pathFrequency.y.min, SimulationParams.pathFrequency.y.max) + Math.random()*2)

      cycleTweetsInterval = setInterval(this.cycleTweets, 1000)

      const scene = this.$el.querySelector('a-scene')
      if (scene.hasLoaded) {
        if(this.hasHashtag) {
          this.isLoaded = true
          this.buildSplineAndRun()
        } else {
          this.$router.push({ path: '/' })
        }
      } else {
        scene.addEventListener('loaded', () => {
          if(this.hasHashtag) {
            this.isLoaded = true
            this.buildSplineAndRun()
          } else {
            this.$router.push({ path: '/' })
          }
        })
      }

      let events = 'enter-vr exit-vr'
      events.split(' ').forEach(e => scene.addEventListener(e, () => {
          this.isVR = scene.is('vr-mode')
      }), false)

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
