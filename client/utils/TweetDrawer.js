import { CanvasTextWrapper } from 'utils/CanvasTextWrapper'

class TweetDrawer {

  constructor (tweet, canvas) {
    this.tweet = tweet
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.color = '#FF0000'
  }

  drawBackground () {
    this.ctx.fillStyle = this.color
    this.ctx.fillRect (0, 0, this.canvas.width, this.canvas.height)
  }

  drawImage () {
    let promise = new Promise( (resolve, reject) => {
      let img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        this.ctx.drawImage(img, 20, 20, 70, 70)
        resolve()
      }
      img.src = this.tweet.author.image_url
    })

    return promise

  }

  drawUserName () {
    this.ctx.font = '20px Lato'
    this.ctx.fillStyle = '#000000'
    this.ctx.fillText(this.tweet.author.name, 70 + 20 + 10, 70/2 + 20)
  }

  drawUserScreenName () {
    this.ctx.font = '16px Lato'
    this.ctx.fillStyle = '#AAAAAA'
    this.ctx.fillText('@' + this.tweet.author.screen_name, 70 + 20 + 10, 70/2 + 20 + 20 + 1)
  }

  drawContent () {
    CanvasTextWrapper(this.canvas, this.tweet.content, {
      fontSize: 30,
      color: '#222222'
    })
  }

  draw () {
    return new Promise((resolve, reject) => {
      this.drawBackground()
      this.drawUserName()
      this.drawUserScreenName()
      this.drawContent()
      this.drawImage().then( () => {
        resolve(this.canvas)
      })
    })
  }

}

export default TweetDrawer
