<template>
  <a-entity :position="attributify(position)">
    <a-camera></a-camera>
  </a-entity>
</template>

<script>
  import { attributify } from 'utils/aframe-utils.js'
  
  export default {
    name: 'Camera',
    props: {
      position: Object
    },
    methods: {
      attributify
    }
  }


</script>