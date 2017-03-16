<template>
  <div id="renderer" :class="sceneIsReady ? 'show' : 'hide' ">
    <a-scene>
      <assets></assets>
      <tweet v-for="tweet in visibleTweets" :key="tweet.id" :position="tweet.position" :tweet="tweet"></tweet>
      <frame v-for="frame in visibleFrames" :key="frame.id" :id="frame.id" :position="frame.position" :rotation="frame.rotation"></frame>
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
  import Frame from 'components/Frame'

  import SimulationParams from '../params.js'
  import Random from 'utils/maths/random.js'
  import PathCalculator from 'utils/PathCalculator.js'

  import { getTweetsFromAPI } from 'store/api'

  let cycleFramesInterval = null
  let cycleTweetsInterval = null
  let cameraTween = null

  export default {
    name: 'Renderer',
    components: {
      'camera': Camera,
      'assets': Assets,
      'tweet': Tweet,
      'light': Light,
      'frame': Frame
    },
    data: () => {
      return {
        controlsEnabled: true,
        inProgress: true,
        isVR: false,
        frameParams: {
          number: 0,
          offset: 0,
          separator: 32,
          rotation: 0,
          rotationOffset: 20
        },
        framesToRender: [],
        tweetsToRender: [],
        isLoaded: false,
        framesAreReady: false,
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
        return this.isLoaded && this.framesAreReady
      },
      hasHashtag () {
        return !!this.$store.state.hashtag
      },
      tweets() {
        return this.$store.state.tweets
      },
      visibleTweets: function () {
        return this.tweetsToRender.filter((tweet) => {
          return (Math.abs(tweet.position.z) > (Math.abs(this.camera.position.z) - 5)) && (Math.abs(tweet.position.z) < (Math.abs(this.camera.position.z) + 50))
        })
      },
      visibleFrames: function () {
        return this.framesToRender.filter((frame) => {
          return (Math.abs(frame.position.z) > (Math.abs(this.camera.position.z) - 20)) && (Math.abs(frame.position.z) < (Math.abs(this.camera.position.z) + 250))
        })
      }
    },
    methods: {
      drawPath: function () {
        let tempPaths = []
        for(let i = this.pathParams.offset; i < SimulationParams.pathAmountPerCycle + this.pathParams.offset; ++i) {
          tempPaths.push(PathCalculator.at(i))
        }

        this.paths = tempPaths
        this.pathParams.offset += SimulationParams.pathAmountPerCycle
      },
      startSimulation: function () {
        cameraTween = TweenMax.to(this.camera.position, SimulationParams.speed, { bezier: this.paths, ease: Linear.easeNone, repeat: 0, onComplete: this.buildSplineAndRun })
      },
      buildSplineAndRun: function() {
        this.drawPath()
        this.startSimulation()
      },
      initFirstFrames: function () {
        for (let nb = 0; nb < 10; nb++) {
          this.cycleFrames()
        }
        this.framesAreReady = true
        cycleFramesInterval = setInterval(this.cycleFrames, 1000)
      },
      cycleFrames: function () {
        if( this.framesToRender.length < (this.tweetsToRender.length + 10) ) {
          let frame = {}

          frame.id = this.frameParams.number
          frame.position = PathCalculator.objectAfter(this.frameParams.offset + 10)
          frame.rotation = { x: 0, y: 45, z: 0 }

          this.frameParams.number += 1
          this.frameParams.offset += this.frameParams.separator
          this.frameParams.rotation += this.frameParams.rotationOffset

          this.framesToRender.push(frame)
        }
      },
      cycleTweets: function() {
        if(this.tweets.length > 0) {
          let tweet = this.tweets[0]

          if(this.tweetsToRender.length % 2 == 0) {
            tweet.position = PathCalculator.after(this.pathParams.separator - 30, 'left')
          } else {
            tweet.position = PathCalculator.after(this.pathParams.separator - 30, 'right')
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
          this.$store.dispatch('showEndMessage', true)
          clearInterval(cycleTweetsInterval)
          clearInterval(cycleFramesInterval)
          let redirectToHome = setTimeout( () => {
            if(this.isVR) {
              this.$el.querySelector('a-scene').exitVR()
            }
            this.$router.push({ path: '/hashtag' })
          }, 6 * 1000)
        }
      },
      createPauseHandler: function () {
        if (false) { //TODO : is mobile
          window.addEventListener("click", this.pauseOrPlay, false)
        } else {
          window.addEventListener("keydown", this.pauseOrPlaySpacebarHandler, false)
          window.addEventListener("keyup", this.pauseOrPlaySpacebarHandler, false)
        }
      },
      pause: function() {
        cameraTween.timeScale(0.3)
      },
      play: function() {
        cameraTween.timeScale(1)
      },
      pauseOrPlaySpacebarHandler: function (e) {
        const onSpaceDown = (e, f) => { if (e.code == "Space" && e.type == "keydown") f() }
        const onSpaceUp = (e, f) => { if (e.code == "Space" && e.type == "keyup") f() }
        onSpaceDown(e, this.pause)
        onSpaceUp(e, this.play)
      }
    },
    mounted () {
      this.$store.dispatch('showEndMessage', false)

      const freq = SimulationParams.pathFrequency
      const ampl = SimulationParams.pathAmplitude
      PathCalculator.setAmplitude(Random.getRandomInt(ampl.x.min, ampl.x.max), Random.getRandomInt(ampl.y.min, ampl.y.max))
      PathCalculator.setFrequency(Random.getRandomInt(freq.x.min, freq.x.max) + Math.random()*2, Random.getRandomInt(freq.y.min, freq.y.max) + Math.random()*2)

      this.initFirstFrames()

      const startIfOk = () => {
        if(this.hasHashtag) {
          this.isLoaded = true
          this.buildSplineAndRun()
          cycleTweetsInterval = setInterval(this.cycleTweets, 1000)
          this.createPauseHandler()
        } else {
          this.$router.push({ path: '/hashtag' })
        }
      }

      const scene = this.$el.querySelector('a-scene')
      if (scene.hasLoaded) {
        startIfOk()
      } else {
        scene.addEventListener('loaded', startIfOk)
      }

      let events = 'enter-vr exit-vr'
      events.split(' ').forEach(e => scene.addEventListener(e, () => {
        this.isVR = scene.is('vr-mode')
      }), false)
    },
    beforeDestroy () {
      clearInterval(cycleTweetsInterval)
      clearInterval(cycleFramesInterval)
      if (false) { // TODO : is mobile
        document.removeEventListener("click", this.pauseOrPlay)
      } else {
        document.removeEventListener("keyup", this.pauseOrPlaySpacebarHandler)
        document.removeEventListener("keydown", this.pauseOrPlaySpacebarHandler)
      }
      this.$store.dispatch('resetAfterExperiment')
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
