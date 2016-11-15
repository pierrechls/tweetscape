<template>
  <a-entity :position="attributify(position)" :rotation="attributify(rotation)">
    <a-camera></a-camera>
  </a-entity>
</template>

<script>
  import { attributify } from 'utils/aframe-utils.js'
  
  export default {
    name: 'Camera',
    props: {
      position: Object,
      rotation: Object
    },
    methods: {
      attributify
    }
  }


</script>