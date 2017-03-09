<template>
  <div class="home">
    <div :class="waitingResponseFromAPI ? 'content waiting' : 'content'">
      <h1 class="title">Insert your hashtag</h1>
      <div class="select-your-hashtag">
        <div class="search-hashtag"><p class="hashtag-input"><input type="text" id="hashtaginput" name="hashtag" v-model="userHashtag" tabindex="-1" autofocus/></p></div>
        <button id="start" @click="start" :disabled="!isHashtag">Let's start!</button>
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
        waitingResponseFromAPI: false,
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
      },
      gradientCanvas: function () {
        return this.$store.state.gradients.find(function(item) { return item.name === 'canvas-interactive'})
      }
    },
    methods: {
      start: function () {
        this.waitingResponseFromAPI = true

        this.$store.dispatch('setHashtag', this.userHashtag)
        this.userHashtag = ''

        getTweetsFromAPI()
          .then( () => {
            this.isLoading = true
            this.gradientCanvas.gradient.changeState('timeline-state')
            this.startLoader()
            this.$store.dispatch('sortTweetsByDate')
            this.goToTimeline()
          }, (response) => {
            setTimeout( () => {
              this.waitingResponseFromAPI = false
            }, 3 * 1000)
            if(response.error == -1) {
              console.log('Hashtag not very famous')
            } else {
              console.log('Twitter API seems to have a problem...')
            }
          })
      },
      startLoader: function () {
        TweenMax.fromTo('.preloader', 1.5, { opacity: 0 }, { opacity: 1, onComplete: () => {}})
      },
      goToTimeline: function () {
        TweenMax.fromTo('.preloader', 1.5, { opacity: 1 }, { opacity: 0, onComplete: () => {
          this.isLoading = false
          this.$router.push({ path: '/timeline' })
        }}).delay(1)
      }
    },
    mounted () {
      if(this.gradientCanvas) {
        this.gradientCanvas.gradient.changeState('home-state')
      }
      this.$el.querySelector('#hashtaginput').addEventListener('keypress', (ev) => {
          var key = ev.which || ev.keyCode
          if (key === 13 && this.isHashtag) {
            this.start()
          }
      })
    }
  }

</script>

<style lang="scss" scoped>

  .home {

    .content {
      width: 30rem;
      height: 30rem;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -15rem;
      margin-top: -15rem;
      color: #FFFFFF;
      opacity: 1;
      -webkit-transition: all .6s ease-in-out;
      -moz-transition: all .6s ease-in-out;
      -o-transition: all .6s ease-in-out;
      transition: all .6s ease-in-out;

      .title {
        text-align: center;
        font-size: 3.5rem;
      }

      .select-your-hashtag {
        text-align: center;
        vertical-align: middle;

        .search-hashtag {

          .hashtag-input {

            input[type="text"] {
              border-radius: 0;
              border: none;
              background: none;
              color: #FFFFFF;
              padding-left: 3rem;
              font-size: 1.5rem;
              outline: none;
              background-image: url('~assets/hashtag-icon.svg');
              background-repeat: no-repeat;
              background-size: 15%;
              background-position: 0.5rem;
              width: 15rem;
              height: 5rem;
            }

          }

        }

        #start{
          outline: none;
          border: none;
          padding: 1rem 2rem;
          border-radius: 8px;
          color: #FFF;
          opacity: 1;
          text-transform: uppercase;
          border: 0.1rem solid rgba(255,255,255,0.5);
          cursor: pointer;
          font-weight: 400;
          letter-spacing: 0.2rem;
          background-color: rgba(255, 255, 255, 0.2);
          -webkit-transition: all .6s ease-in-out;
          -moz-transition: all .6s ease-in-out;
          -o-transition: all .6s ease-in-out;
          transition: all .6s ease-in-out;

          &:hover {
            color: rgba(0, 0, 0, 0.5);
            background-color: rgba(255, 255, 255, 0.6);
          }

          &:disabled {
            opacity: 0;
          }

        }

        @keyframes test_hover {
          from {
            background-position: 0% 100%;
          }
          to {
            background-position: 100% 0%;
          }
        }
      }

      &.waiting {
        opacity: 0;
      }

    }
  }

</style>
