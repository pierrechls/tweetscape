<template>
  <a-plane :position="attributify(position)"
           :width="tweetParams.width"
           :height="tweetParams.height"
           :canvas-material="'width:' + tweetParams.canvasWidth + ';height:' + tweetParams.canvasHeight + ';'"
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
      window.setTimeout( () => {
        let canvas = this.$el.components['canvas-material'].canvas
        let tweetDrawer = new TweetDrawer(this.tweet, canvas)
        tweetDrawer.draw().then( () => {
            this.$el.components['canvas-material'].updateTexture()
        })
      },100)
    },
    methods: {
      attributify
    }
  }

</script>
