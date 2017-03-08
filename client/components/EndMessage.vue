<template>
  <a-entity id="msg-end" :text="'opacity: 0; align: center; value:' + message + ';'" position="0 0 -1">
    <a-animation attribute="text.opacity" begin="fade" to="1"></a-animation>
  </a-entity>
</template>

<script>

  export default {
    name: 'EndMessage',
    data () {
      return {
        message: 'EXPÉRIENCE FINIE'
      }
    }
  }

</script>
