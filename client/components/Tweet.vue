<template>
  <a-plane :material="'shader: flat; src: #' + id"
           :geometry="'width:' + tweetParams.width + ';height:' + tweetParams.height + ';'"
           :position="attributify(position)"
  >
  </a-plane>
</template>

<script>
  import { attributify } from 'utils/aframe-utils'
  import SimulationParams from '../params.js'

  export default {
    name: 'Tweet',
    props: {
      position: Object,
      id: String
    },
    computed: {
      tweetParams () {
        return SimulationParams.tweets
      }
    },
    methods: {
      attributify 
    }
  }

</script>