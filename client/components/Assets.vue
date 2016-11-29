<template>
  <a-assets>
    <canvas v-for="id in tweetTextureIds" :id="id" crossOrigin="anonymous"></canvas>
  </a-assets>
</template>

<script>
  export default {
    name: 'Assets',
    computed: {
      tweets() {
        return this.$store.state.tweets
      },
      tweetTextureIds() {
        return this.tweets.map(t => t.id)
      }
    }
  }
</script>