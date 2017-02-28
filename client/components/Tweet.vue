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

      /* *********************************************** */
      /* TEST 3 : sans aframe-canvas + fade-in animation */
      /* *********************************************** */

      window.setTimeout( () => {

        let canvas = document.createElement('canvas')
        canvas.width = SimulationParams.tweetSize.canvasWidth
        canvas.height = SimulationParams.tweetSize.canvasHeight

        let tweetDrawer = new TweetDrawer(this.tweet, canvas)

        tweetDrawer.draw().then( (c) => {
          let texture = new THREE.Texture(c)
          let material = new THREE.MeshBasicMaterial({ map: texture, transparent: false, opacity: 0 })
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
