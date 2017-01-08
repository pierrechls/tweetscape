<template>
  <canvas :id="tweet.id" crossOrigin="anonymous" width="400" height="300"></canvas>
</template>

<script>

  import { CanvasTextWrapper } from 'canvas-text-wrapper'

  export default {
    name: "TweetCanvas",
    data() {
      return {
        ctx: null,
        canvas: null,
      }
    },
    props: {
      tweet: Object
    },
    mounted() {
      this.canvas = this.$el
      this.ctx = this.canvas.getContext("2d")
      this.draw()
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
      }
    }
  }

  /*
let status = {
  id: "808298650141081600",
  author: {
    name: "Tata Monique",
    screen_name: "tatamonique02",
    image_url: "https://placehold.it/150x150"
  },
  content: "Plusieurs versions sont apparues avec le temps, parfois par accident, souvent intentionnellement (histoire d'y rajouter de petits clins d'o"
}

var canvas = document.getElementById(status.id)
var ctx = canvas.getContext("2d")

var draw = function() {
  drawBackground("#F2F2F2")
  drawImage(status.author.image_url)
  drawUserName()
  drawUserScreenName()
  drawContent()
}

var drawBackground = function(color) {
  ctx.fillStyle = color;
  ctx.fillRect (0, 0, canvas.width, canvas.height);
}

var drawImage = function(image_url) {
  console.log(image_url)
  var img = new Image();
  img.onload = function(){
    ctx.drawImage(img, 20, 20, 70, 70)
  }
  img.src = image_url;
}

var drawUserName = function() {
  ctx.font = "20px Lato"
  ctx.fillStyle = "#000"

  // left = img.width + img.leftMargin + img.rightMargin
  // top = img.height/2 + img.topMargin
  ctx.fillText(status.author.name, 70 + 20 + 10, 70/2 + 20)
}

var drawUserScreenName = function() {
  // left = img.width + img.leftMargin + img.rightMargin
  // top = img.height/2 + img.topMargin + author.name.height + lineSpacing
  ctx.font = "16px Lato"
  ctx.fillStyle = "#AAA"
  ctx.fillText("@" + status.author.screen_name, 70 + 20 + 10, 70/2 + 20 + 20 + 1)
}

var drawContent = function() {
  ctx.fillStyle = "#222"
  CanvasTextWrapper(canvas, status.content, {
    font: "20px Lato",
    lineHeight: 1.2,
    paddingX: 20,
    marginY: 110
  });
}
*/
</script>
