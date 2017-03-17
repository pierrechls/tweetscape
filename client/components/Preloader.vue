<template>
  <div :class="showPreloaderIcon ? 'preloader show' : 'preloader'" :style="display ? 'display: table' : 'display: none'">
    <div class="preloader-center">
      <div class="preloader-icon">
        <svg width="34" height="38" viewBox="0 0 34 38">
          <path class="preloader-path" stroke-dashoffset="0" d="M29.437 8.114L19.35 2.132c-1.473-.86-3.207-.86-4.68 0L4.153 8.114C2.68 8.974 1.5 10.56 1.5 12.28v11.964c0 1.718 1.22 3.306 2.69 4.165l10.404 5.98c1.47.86 3.362.86 4.834 0l9.97-5.98c1.472-.86 2.102-2.45 2.102-4.168V12.28c0-1.72-.59-3.306-2.063-4.166z">
            <animate attributeType="XML" attributeName="stroke-dashoffset" from="0" to="102px" dur="1s" repeatCount="indefinite"/>
          </path>
        </svg>
      </div>
      <div :class="showPreloaderInfos ? 'informations show' : 'informations'">
        <div v-if="mobile" class="mobile-infos">
          <div class="info landscape">
            <img src="~assets/icons/smarthphone-orientation.svg" />
            <p>Turn your mobile to landscape mode</p>
          </div>
          <div class="info cardboard">
            <img src="~assets/icons/cardboard.svg" />
            <p>Insert your mobile in your Cardboard</p>
          </div>
        </div>
        <div v-else class="desktop-infos">
          <div class="info landscape">
            <img src="~assets/icons/spacebar.svg" />
            <p>Press spacebar to slow down</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import { isMobile } from 'utils/isMobile'

  export default {
    name: 'Preloader',
    props: {
      display: Boolean
    },
    data () {
      return {
        showPreloaderIcon: false,
        showPreloaderInfos: false
      }
    },
    computed: {
      mobile: function () {
        return isMobile()
      }
    },
    mounted () {
      this.$store.subscribe((mutation, state) => {
        if(mutation.type === 'SHOW_PRELOADER') {
          if(state.showPreloader) {
            setTimeout( () => { this.showPreloaderIcon = true }, 1 * 1000)
            setTimeout( () => { this.showPreloaderInfos = true }, 1.5 * 1000)
          } else {
            this.showPreloaderIcon = false
            this.showPreloaderInfos = false
          }
        }
      })
    }
  }

</script>

<style lang="scss" scoped>

  .preloader {
    /*display : table;*/
    position: absolute;
    z-index: 99;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align : center;
    width: 100%;
    height: 100%;
    min-height: 23rem;
    min-width: 23rem;
    opacity: 0;
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;

    &.show {
      opacity: 1;
    }

    &:before {
      display : inline-block;

      height : 100%;

      content : '';
      vertical-align : middle;
    }
  }

  .preloader-icon {
    margin: 0 auto 4rem auto;
  }

  .preloader-center {
    display : inline-block;
    text-align : center;
    vertical-align : middle;
  }

  .preloader-path {
    stroke-linejoin: round;
    fill: none;
    stroke: #FFFFFF;
    stroke-width: 2;
    stroke-dasharray: 70 32;
  }

  .informations {
    opacity: 0;
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;

    &.show {
      opacity: 1;
    }


    & > div > .info {
      width: 10rem;
      margin: 0 2rem;
      display: inline-block;
    }

    img {
      width: 5rem;
      height: 5rem;
      display: inline-block;
    }

    p {
      font-size: 1rem;
      color: #FFFFFF;
      text-transform: uppercase;
    }

  }

</style>
