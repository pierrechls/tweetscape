<template>
  <a-entity>
    <a-entity light="type: ambient; color: #6B4BBA; intensity: 0.5;"></a-entity>
    <a-entity id="spot-light" light="type: spot; angle: 45; color: #21C2CC; penumbra: 1; distance: 17; intensity: 0.7; decay: -3;" :position="attributify(position)">
      <a-animation attribute="light.intensity" begin="turn-the-light-off" to="0"></a-animation>
    </a-entity>
  </a-entity>
</template>

<script>

  import { attributify } from 'utils/aframe-utils.js'

  export default {
    name: 'Light',
    props: {
      position: Object
    },
    methods: {
      attributify
    }
  }

</script>
