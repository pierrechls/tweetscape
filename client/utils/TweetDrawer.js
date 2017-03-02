import { getLines, CanvasTextWrapper } from 'utils/CanvasTextWrapper'

const textStyle = {
  fontSize: 25,
  color: '#222222'
}

const imageStyle = {
  imageSize: 100,
  imageMargin: 30
}

class TweetDrawer {

  constructor (tweet, canvas) {
    this.tweet = tweet
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.color = '#FF0000'
    this.lines = getLines(this.ctx, this.tweet.content, this.canvas.width, textStyle.fontSize)
  }

  drawBackground () {
    this.ctx.fillStyle = this.color
    this.ctx.fillRect (0, 0, this.canvas.width, this.canvas.height)
  }

  drawContent () {
    CanvasTextWrapper(this.canvas, this.lines, textStyle)
  }

  drawImage () {
    let promise = new Promise( (resolve, reject) => {
      let img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        this.ctx.drawImage(img, (this.canvas.width / 2) - (imageStyle.imageSize / 2), 110 - (this.lines.length + 1) * 5, imageStyle.imageSize, imageStyle.imageSize)
        resolve()
      }
      img.src = this.tweet.author.image_url
    })

    return promise

  }

  drawUserName () {
    this.ctx.font = '20px Lato'
    this.ctx.fillStyle = '#000000'
    this.ctx.textAlign= 'center'
    this.ctx.fillText(this.tweet.author.name, this.canvas.width/2, 110 - (this.lines.length + 1) * 5 + imageStyle.imageSize + 30)
  }

  drawUserScreenName () {
    this.ctx.font = '16px Lato'
    this.ctx.fillStyle = '#000000'
    this.ctx.textAlign= 'center'
    this.ctx.fillText('@' + this.tweet.author.screen_name, this.canvas.width/2, 110 - (this.lines.length + 1) * 5 + imageStyle.imageSize + 50)
  }

  draw () {
    return new Promise((resolve, reject) => {
      this.drawBackground()
      this.drawContent()
      this.drawUserName()
      this.drawUserScreenName()
      this.drawImage().then( () => {
        resolve(this.canvas)
      })
    })
  }

}

export default TweetDrawer
