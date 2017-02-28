<template>
  <a-plane :width="tweetParams.width"
           :height="tweetParams.height"
           :position="attributify(position)"
           :rotation="attributify(rotation)"
           material="opacity: 0;"
    >
  </a-plane>
</template>

<script>

  import TweetDrawer from 'utils/TweetDrawer'
  import SimulationParams from '../params.js'
  import { attributify } from 'utils/aframe-utils'

  export default {
    name: 'Tweet',
    props: {
      position: Object,
      rotation: Object,
      tweet: Object
    },
    data() {
      return {}
    },
    computed: {
      tweetParams () {
        return SimulationParams.tweetSize
      }
    },
    mounted() {

      // TODO if it's work without aframe-canvas :
      //      - remove dependency into package.json
      //      - remove import aframe-canvas into index.js file

      /* *************************** */
      /* TEST 1 : avec aframe-canvas */
      /* *************************** */

      // NOTE: to test it, please insert this prop into a-plane :
      //       ` :canvas-material="'width:' + tweetParams.canvasWidth + ';height:' + tweetParams.canvasHeight + ';'" `

      // window.setTimeout( () => {
      //    let canvas = this.$el.components['canvas-material'].canvas
      //    let tweetDrawer = new TweetDrawer(this.tweet, canvas)
      //
      //    tweetDrawer.draw().then( () => {
      //      this.$el.components['canvas-material'].updateTexture()
      //    })
      // }, 100)

      /* *************************** */
      /* TEST 2 : sans aframe-canvas */
      /* *************************** */

      // window.setTimeout( () => {
      //
      //   let canvas = document.createElement('canvas')
      //   canvas.width = 512
      //   canvas.height = 512
      //
      //   let tweetDrawer = new TweetDrawer(this.tweet, canvas)
      //
      //   tweetDrawer.draw().then( () => {
      //     let texture = new THREE.Texture(canvas)
      //     let material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0 })
      //     this.$el.object3D.children[0].material = material
      //     texture.needsUpdate = true
      //
      //   })
      //
      // }, 100)

      /* *********************************************** */
      /* TEST 3 : sans aframe-canvas + fade-in animation */
      /* *********************************************** */

      window.setTimeout( () => {

        let canvas = document.createElement('canvas')
        canvas.width = 512
        canvas.height = 512

        let tweetDrawer = new TweetDrawer(this.tweet, canvas)

        tweetDrawer.draw().then( () => {
          let texture = new THREE.Texture(canvas)
          let material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0 })
          this.$el.object3D.children[0].material = material
          texture.needsUpdate = true

          let fadeIn = 0
          let fadeTexture = setInterval( () => {
            if(fadeIn >= 1.0){ clearInterval(fadeTexture) }
            fadeIn += 0.1
            this.$el.object3D.children[0].material.opacity = fadeIn
          }, 100)

          })

      }, 100)

    },
    methods: {
      attributify
    }
  }

</script>
