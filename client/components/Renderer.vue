<template>
  <div id="renderer" :class="sceneIsReady ? 'show' : 'hide' ">
    <a-scene gridhelper="size: 3000; divisions: 1000">
      <assets></assets>
      <tweet v-for="tweet in visibleTweets" :key="tweet.id" :position="tweet.position" :rotation="tweet.rotation" :tweet="tweet"></tweet>
      <custom-torus v-for="torus in visibleCustomTorus" :key="torus.id" :id="torus.id" :position="torus.position" :rotation="torus.rotation"></custom-torus>
      <camera :position="camera.position" :controls-enabled="controlsEnabled"></camera>
      <light :position="camera.position"></light>
      <a-gradient-sky material="shader: gradient; topColor: 2 25 65; bottomColor: 2 20 50;"></a-gradient-sky>
    </a-scene>
  </div>
</template>

<script>

  import Camera from 'components/Camera'
  import Assets from 'components/Assets'
  import Light from 'components/Light'
  import Tweet from 'components/Tweet'
  import CustomTorus from 'components/CustomTorus'

  import SimulationParams from '../params.js'
  import Vector3D from 'utils/maths/vector3d.js'
  import Random from 'utils/maths/random.js'
  import PathCalculator from 'utils/PathCalculator.js'

  import { getTweetsFromAPI } from 'store/api'

  let cycleCustomTorusInterval = null
  let cycleTweetsInterval = null

  export default {
    name: 'Renderer',
    components: {
      'camera': Camera,
      'assets': Assets,
      'tweet': Tweet,
      'light': Light,
      'custom-torus': CustomTorus
    },
    data: () => {
      return {
        controlsEnabled: true,
        inProgress: true,
        isVR: false,
        customTorusParams: {
          number: 0,
          offset: 0,
          separator: 30,
          rotation: 0,
          rotationOffset: 20
        },
        customTorusToRender: [],
        tweetsToRender: [],
        isLoaded: false,
        torusAreReady: false,
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
      sceneIsReady () {
        return this.isLoaded && this.torusAreReady ? true : false
      },
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
      },
      visibleCustomTorus: function () {
        return this.customTorusToRender.filter((customTorus) => {
          return (Math.abs(customTorus.position.z) > (Math.abs(this.camera.position.z) - 10)) && (Math.abs(customTorus.position.z) < (Math.abs(this.camera.position.z) + 250))
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
      initFirstTorus: function () {
        for (let nb = 0; nb < 10; nb++) {
          this.cycleCustomTorus()
        }
        this.torusAreReady = true
        cycleCustomTorusInterval = setInterval(this.cycleCustomTorus, 1000)
      },
      cycleCustomTorus: function () {
        if( this.customTorusToRender.length < (this.tweetsToRender.length + 10) ) {
          let torus = {}

          torus.id = this.customTorusParams.number
          torus.position = PathCalculator.torusAfter(this.customTorusParams.offset + 50)
          torus.rotation = { x: 0, y: 0, z: -this.customTorusParams.rotation }

          this.customTorusParams.number += 1
          this.customTorusParams.offset += this.customTorusParams.separator
          this.customTorusParams.rotation += this.customTorusParams.rotationOffset

          this.customTorusToRender.push(torus)
        }
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
          document.querySelector('#spot-light').emit('turn-the-light-off')
          document.querySelector('#msg-end').emit('fade')
          clearInterval(cycleTweetsInterval)
          clearInterval(cycleCustomTorusInterval)
          let redirectToHome = setTimeout( () => {
            if(this.isVR) {
              this.$el.querySelector('a-scene').exitVR()
            }
            this.$router.push({ path: '/hashtag' })
          }, 5 * 1000)
        }

      }
    },
    mounted () {

      PathCalculator.setAmplitude(Random.getRandomInt(SimulationParams.pathAmplitude.x.min, SimulationParams.pathAmplitude.x.max), Random.getRandomInt(SimulationParams.pathAmplitude.y.min, SimulationParams.pathAmplitude.y.max))
      PathCalculator.setFrequency(Random.getRandomInt(SimulationParams.pathFrequency.x.min, SimulationParams.pathFrequency.x.max) + Math.random()*2, Random.getRandomInt(SimulationParams.pathFrequency.y.min, SimulationParams.pathFrequency.y.max) + Math.random()*2)

      this.initFirstTorus()

      const scene = this.$el.querySelector('a-scene')
      if (scene.hasLoaded) {
        if(this.hasHashtag) {
          this.isLoaded = true
          this.buildSplineAndRun()
          cycleTweetsInterval = setInterval(this.cycleTweets, 1000)
        } else {
          this.$router.push({ path: '/hashtag' })
        }
      } else {
        scene.addEventListener('loaded', () => {
          if(this.hasHashtag) {
            this.isLoaded = true
            this.buildSplineAndRun()
            cycleTweetsInterval = setInterval(this.cycleTweets, 1000)
          } else {
            this.$router.push({ path: '/hashtag' })
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
      clearInterval(cycleCustomTorusInterval)
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
