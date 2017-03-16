<template>
  <a-entity id="camera" camera :position="attributify(position)" :look-controls="controlsEnabled ? '' : 'enabled: false; hmdEnabled: false;'">
    <end-message></end-message>
  </a-entity>
</template>

<script>

  import { attributify } from 'utils/aframe-utils.js'
  import EndMessage from 'components/EndMessage'

  export default {
    name: 'Camera',
    props: {
      position: Object,
      controlsEnabled: Boolean
    },
    methods: {
      attributify
    },
    components: {
      EndMessage
    }
  }

</script>
