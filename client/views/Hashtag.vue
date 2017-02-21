<template>
  <div class="home">
    <div class="content">
      <h1 class="title">Insert your fucking hashtag</h1>
      <div class="select-your-hashtag">
        <p><span class="hashtag-icon">#</span><input type="text" name="hashtag" v-model="userHashtag"/></p>
        <button @click="startLoader" :disabled="!isHashtag">Let's start!</button>
      </div>
    </div>
    <preloader :display="isLoading"></preloader>
  </div>
</template>

<script>

  import Preloader from 'components/Preloader'
  import { getTweetsFromAPI } from 'store/api'

  export default {
    name: 'Hashtag',
    data () {
      return {
        userHashtag: '',
        isLoading: false
      }
    },
    components: {
      Preloader
    },
    computed: {
      isHashtag: function() {
        const regex = /^\w{1,100}$/
        return regex.test(this.userHashtag)
      }
    },
    methods: {
      start: function () {
        this.$store.dispatch('setHashtag', this.userHashtag)
        this.userHashtag = ''

        getTweetsFromAPI()
          .then( () => {
            this.$store.dispatch('sortTweetsByDate')
            this.goToTimeline()
          }, (response) => {
            this.$store.dispatch('isNotLoading')
          })
      },
      startLoader: function () {
        TweenMax.fromTo('.home .content', 0.5, { opacity: 1 }, { opacity: 0, onComplete: () => {
          this.isLoading = true
          TweenMax.fromTo('.preloader', 1.5, { opacity: 0 }, { opacity: 1, onComplete: () => {
            this.start()
          }})
      }})
      },
      goToTimeline: function () {
        TweenMax.fromTo('.preloader', 1.5, { opacity: 1 }, { opacity: 0, onComplete: () => {
          this.isLoading = false
          this.$router.push({ path: '/timeline' })
        }}).delay(1)
      }
    }
  }

</script>

<style lang="scss" scoped>

  .home {

    .content {

      .title {
        text-align: center;
      }

      .select-your-hashtag {
        text-align: center;
        vertical-align: middle;

        .hashtag-icon {
          margin-right: 1rem;
        }
      }
    }
  }

</style>
