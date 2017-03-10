<template>
  <a-entity :position="attributify(position)" particle-system="preset: dust; type:2 ; accelerationValue: 0 -1 -3; velocityValue: 0 0 0; velocitySpread: 5 1 5; particleCount: 500; maxAge: 3; color: #777777; size: 0.5;"></a-entity>
</template>

<script>
  import { attributify } from 'utils/aframe-utils.js'

  export default {
    name: 'particle-system',
    data () {
      return {
        offset: {
          x: 0, y: -10, z: -15
        }
      }
    },
    props: {
      cameraPosition: Object
    },
    computed: {
      position: function() {
        return {
          x: this.cameraPosition.x + this.offset.x,
          y: this.cameraPosition.y + this.offset.y,
          z: this.cameraPosition.z + this.offset.z
        }
      }
    },
    methods: {
      attributify
    }
  }

</script>
