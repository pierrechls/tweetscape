<template>
  <div class="twitter">
    <h1>Inster your fucking hashtag</h1>
    <input type="text" name="hashtag" v-model="userHashtag"/>
    <button @click="start">Let's start!</button>
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
    methods: {
      start: function () {
        this.$store.dispatch('setHashtag', this.userHashtag)

        this.$http.get(`search/${this.userHashtag}`).then((response) => {
          console.log('success: ', response.data)
        }, (response) => {
          console.log('error: ', response)
        })
      }
    },
    computed: {

    }
  }

</script>

<style>

</style>
