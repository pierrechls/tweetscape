<template>
  <a-assets></a-assets>
</template>

<script>

  export default {
    name: 'Assets',
    computed: {
      tweets() {
        return this.$store.state.tweets
      }
    }
  }

</script>
