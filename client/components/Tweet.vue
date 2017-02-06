<template>
  <a-plane :position="attributify(position)"
           :canvas-material="'width:' + tweetParams.width + ';height:' + tweetParams.height + ';'"
  >
  </a-plane>
</template>

<script>

  import { CanvasTextWrapper } from 'canvas-text-wrapper'
  import { attributify } from 'utils/aframe-utils'
  import SimulationParams from '../params.js'

  export default {
    name: 'Tweet',
    props: {
      position: Object,
      tweet: Object
    },
    data() {
      return {
        canvas: null,
        ctx: null,

      }
    },
    computed: {
      tweetParams () {
        return SimulationParams.tweetSize
      }
    },
    mounted() {
      window.setTimeout( () => {
        this.canvas = this.$el.components["canvas-material"].canvas
        this.ctx = this.canvas.getContext("2d")
        this.draw()
        this.$el.components["canvas-material"].updateTexture()
      },100)
    },
    methods: {
      draw: function() {
        this.drawBackground("#FF0000")
        this.drawImage()
        this.drawUserName()
        this.drawUserScreenName()
        this.drawContent()
      },
      drawBackground: function(color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect (0, 0, this.canvas.width, this.canvas.height);
      },
      drawImage: function() {
        let img = new Image();
        img.crossOrigin="anonymous"
        img.onload = function(){
          this.ctx.drawImage(img, 20, 20, 70, 70)
        }.bind(this)
        img.src = this.tweet.author.image_url;
      },
      drawUserName: function() {
        this.ctx.font = "20px Lato"
        this.ctx.fillStyle = "#000"

        // left = img.width + img.leftMargin + img.rightMargin
        // top = img.height/2 + img.topMargin
        this.ctx.fillText(this.tweet.author.name, 70 + 20 + 10, 70/2 + 20)
      },
      drawUserScreenName: function() {
        // left = img.width + img.leftMargin + img.rightMargin
        // top = img.height/2 + img.topMargin + author.name.height + lineSpacing
        this.ctx.font = "16px Lato"
        this.ctx.fillStyle = "#AAA"
        this.ctx.fillText("@" + this.tweet.author.screen_name, 70 + 20 + 10, 70/2 + 20 + 20 + 1)
      },
      drawContent: function() {
        this.ctx.fillStyle = "#222"
        CanvasTextWrapper(this.canvas, this.tweet.content, {
          font: "20px Lato",
          lineHeight: 1.2,
          paddingX: 20,
          marginY: 110
        });
      },
      attributify
    }
  }

</script>
