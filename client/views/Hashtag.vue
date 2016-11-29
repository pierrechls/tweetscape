<template>
  <div class="twitter">
    <h1>Inster your fucking hashtag</h1>
    <input type="text" name="hashtag" v-model="userHashtag"/>
    <button @click="$store.dispatch('setHashtag', userHashtag)">Let's start!</button>
  </div>
</template>

<script>

  export default {
    name: 'Hashtag',
    data () {
      return {
        userHashtag: ''
      }
    },
    computed: {

    }
  }

</script>

<style>

</style>
