<template>
  <a-plane :width="tweetParams.width"
           :height="tweetParams.height"
           :position="attributify(position)"
           :rotation="attributify(rotation)"
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
      let canvas = document.createElement('canvas')
      canvas.width = 512
      canvas.height = 512

      let tweetDrawer = new TweetDrawer(this.tweet, canvas)

      let fadeTexture = setInterval( () => {
        tweetDrawer.draw().then( () => {
          let texture = new THREE.Texture(canvas)
          let material = new THREE.MeshBasicMaterial({ map: texture, transparent: true })
          this.$el.object3D.children[0].material = material
          texture.needsUpdate = true
          if( tweetDrawer.getAlpha() >= 1.0 ) {
            clearInterval(fadeTexture)
          }
        })
      },100)

    },
    methods: {
      attributify
    }
  }

</script>
