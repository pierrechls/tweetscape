<template>
  <div class="twitter">
    <h1>Inster your fucking hashtag</h1>
    <input type="text" name="hashtag" v-model="userHashtag"/>
    <button @click="start" :disabled="isHashtag">Let's start!</button>
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
      // TODO (Victor) : Refactor pour la sémantique (cette fonction c'est isNotHashtag actuellement)
      isHashtag: function() {
        const regex = /^\w{1,100}$/
        return !regex.test(this.userHashtag)
      }
    },
    methods: {
      start: function () {
        // TODO (Victor) : Vérifier s'il y a un minimum de 20 tweets pour le hashtag donné
        this.$http.get(`search/${this.userHashtag}`)
          .then((response) => {
            console.log('success: ', response.data)
            this.$store.dispatch('setHashtag', this.userHashtag)
            this.$router.push({ path: '/' })
          }, (response) => {
            console.log('error: ', response)
          })
      }
    }
  }

</script>

<style>

</style>
