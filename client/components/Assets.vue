<template>
  <a-assets>
    <tweet-canvas v-for="tweet in tweets" :tweet="tweet"></tweet-canvas>
  </a-assets>
</template>

<script>
  import TweetCanvas from './TweetCanvas.vue'

  export default {
    name: 'Assets',
    components: {
      'tweet-canvas': TweetCanvas
    },
    computed: {
      tweets() {
        return this.$store.state.tweets
      }
    }
  }
</script>
