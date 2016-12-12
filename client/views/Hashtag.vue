<template>
  <div class="twitter">
    <h1>Insert your fucking hashtag</h1>
    <input type="text" name="hashtag" v-model="userHashtag"/>
    <button @click="start" :disabled="!isHashtag">Let's start!</button>
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
      isHashtag: function() {
        const regex = /^\w{1,100}$/
        return regex.test(this.userHashtag)
      }
    },
    methods: {
      start: function () {
        this.$http.get(`search/${this.userHashtag}`)
          .then((response) => {
            if(response.data.statuses.length > 20) {
              console.log('success: ', response.data)
              this.$store.dispatch('setHashtag', this.userHashtag)
              this.$router.push({ path: '/timeline' })
            } else {
              console.log('Sorry but your hashtag seems to be not very famous')
            }
          }, (response) => {
            console.log('error: ', response)
          })
      }
    }
  }

</script>

<style>

</style>
