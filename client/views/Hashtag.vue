<template>
  <div class="view-hashtag">
    <div :class="waitingResponseFromAPI ? 'content waiting' : 'content'">
      <div id="logo"><img src="~assets/logo/logo-white.svg"/></div>
      <h1 class="title">Insert your hashtag</h1>
      <div class="select-your-hashtag">
        <div class="search-hashtag"><p class="hashtag-input"><span @click="focusToInput">#</span><input type="text" id="hashtaginput" :style="inputWidthStyle" name="hashtag" v-model="userHashtag" tabindex="-1" :maxlength="inputMaxLength" autofocus/></p></div>
        <button id="start" @click="start" :disabled="!isHashtag">Let's start!</button>
      </div>
    </div>
    <div :class="requestError.show ? 'request-error show' : 'request-error'">
      <p>{{ requestError.message }}</p>
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
        requestError: {
          message: '',
          show: false
        },
        waitingResponseFromAPI: false,
        userHashtag: '',
        isLoading: false,
        inputMaxLength: 40
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
      },
      inputWidthStyle () {
        return `width: ${(this.userHashtag.length + 2)*0.8}rem;`
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
              .then( () => {
                this.$store.dispatch('sortTweetsByDate')
                setTimeout( () => {
                  this.goToTimeline()
                }, 3 * 1000)
              })
          }, (response) => {
            if(response.error == -1) {
              this.requestError.message = 'Your hashtag seems to be not very famous'
            } else {
              this.requestError.message = 'Problem when connecting to the twitter API'
            }

            setTimeout( () => { this.requestError.show = true }, 1 * 1000)
            setTimeout( () => { this.requestError.show = false }, 3 * 1000)

            setTimeout( () => {
              this.waitingResponseFromAPI = false
            }, 4 * 1000)
          })
      },
      startLoader: function () {
          return new Promise( (resolve, reject) => {
            this.$store.dispatch('showPreloader', true)
            setTimeout( () => {
              resolve()
            }, 3 * 1000)
          })
      },
      goToTimeline: function () {
        this.$store.dispatch('showPreloader', false)
        setTimeout( () => {
          this.isLoading = false
          this.$router.push({ path: '/timeline' })
        }, 1 * 1000)
      },
      focusToInput: function () {
        this.$el.querySelector('#hashtaginput').focus()
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

      if(window.innerWidth < 640) {
        this.inputMaxLength = 20
      } else {
        this.inputMaxLength = 40
      }

      window.addEventListener('resize', () => {
        if(window.innerWidth < 640) {
          this.inputMaxLength = 20
        } else {
          this.inputMaxLength = 40
        }
      });

      this.focusToInput()
    }
  }

</script>

<style lang="scss" scoped>

  .view-hashtag {

    .content {
      width: 40rem;
      height: 20rem;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -20rem;
      margin-top: -10rem;
      color: #FFFFFF;
      opacity: 1;
      -webkit-transition: all .6s ease-in-out;
      -moz-transition: all .6s ease-in-out;
      -o-transition: all .6s ease-in-out;
      transition: all .6s ease-in-out;

      #logo {
        width: 100%;
        height: auto;

        img {
          display: block;
          width: calc(30rem - 25rem);
          margin: 0 auto;
        }

      }

      .title {
        text-align: center;
        font-size: 1.2rem;
        font-weight: 500;
        letter-spacing: 0.3rem;
        text-transform: uppercase;
      }

      .select-your-hashtag {
        text-align: center;
        vertical-align: middle;

        .search-hashtag {

          .hashtag-input {

            font-size: 1.2rem;

            span {
              margin-left: 1rem;
              padding-right: 1rem;
            }

            input[type="text"] {
              border-radius: 0;
              border: none;
              background: none;
              color: #FFFFFF;
              font-size: 1rem;
              font-weight: 100;
              letter-spacing: 0.2rem;
              outline: none;
              width: 1rem;
              height: 5rem;
              text-align: left;
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
            cursor: default;
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

    .request-error {
      width: 40rem;
      height: 10rem;
      position: absolute;
      z-index: -1;
      left: 50%;
      top: 50%;
      margin-left: -20rem;
      margin-top: -5rem;
      color: #FFFFFF;
      opacity: 0;
      -webkit-transition: all .6s ease-in-out;
      -moz-transition: all .6s ease-in-out;
      -o-transition: all .6s ease-in-out;
      transition: all .6s ease-in-out;

      p {
        text-align: center;
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
      }

      &.show {
        opacity: 1;
      }

    }

    @media screen and (max-width: 640px) {

      .content {
        width: 25rem;
        margin-left: -12.5rem;
      }

      .request-error {
        width: 10rem;
        margin-left: -5rem;
      }
    }

    @media screen and (max-width: 400px) {

      .content {
        width: 100%;
        margin-left: -50%;
      }
    }

  }

</style>
