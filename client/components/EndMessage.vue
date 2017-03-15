<template>
  <a-entity v-if="showEndMessage" position="0 0 -2">
    <a-entity id="end-message-logo" geometry="primitive: plane; height: 1; width: 1;" material="shader: flat; flatShading: true; opacity: 0; src: #logo-end-message; transparent: true;" position="0 0.5 0">
      <a-animation attribute="material.opacity" delay="1000" to="1"></a-animation>
    </a-entity>
    <a-entity id="end-message-text" scale="3 3 3" :text="'opacity: 0; align: center; value:' + message + ';'" position="0 -0.5 0">
      <a-animation attribute="text.opacity" delay="2000" to="1"></a-animation>
    </a-entity>
  </a-entity>
</template>

<script>

  export default {
    name: 'EndMessage',
    data () {
      return {
        message: 'EXPERIMENT OVER'
      }
    },
    computed: {
      showEndMessage () {
        return this.$store.state.showEndMessage
      }
    }
  }

</script>
