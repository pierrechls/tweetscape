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
        let hashtag = this.userHashtag
        this.userHashtag = ''
        this.$http.get(`search/${hashtag}`)
          .then((response) => {
            if(response.data.statuses.length > 20) {
              console.log('success: ', response.data)
              response.data.statuses.forEach((status) => {
                //TODO (Victor) : gérer les différents types de tweets (médias différents, image, vidéo)
                //TODO (Victor) : faire une factory qui crée un type selon son type de média
                let tweet = {
                  id: status.id_str,
                  author: {
                    image_url: status.user.profile_image_url,
                    name: status.user.name,
                    screen_name: status.user.screen_name
                  },
                  created_at: status.created_at,
                  content: status.text
                }

                this.$store.dispatch('addTweet', tweet)
              })
              this.$store.dispatch('setHashtag', hashtag)
              this.goToTimeline()
            } else {
              console.log('Sorry but your hashtag seems to be not very famous')
            }
          }, (response) => {
            console.log('error: ', response)
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
