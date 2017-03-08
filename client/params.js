// TWEET PARAMS
const TWEET_SEPARATOR = 10
const TWEET_SIZE = {
  width: 5,
  height: 5,
  canvasWidth: 512,
  canvasHeight: 512
}
const TWEET_ROTATION = { x: 0, y: 30, z: 0 }

// PATH PARAMS
const SPEED = 40
const PATH_AMOUNT_PER_CYCLE = 100
const PATH_AMPLITUDE = {
  x: { min: 1, max: 3 },
  y: { min: 1, max: 2 }
}
const PATH_FREQUENCY = {
  x: { min: 3, max: 5 },
  y: { min: 3, max: 5 }
}


class SimulationParams {

  // TWEET GETTERS

  static get tweetSize() {
    return TWEET_SIZE
  }

  static get tweetRotation () {
    return TWEET_ROTATION
  }

  static get tweetSeparator() {
  	return TWEET_SEPARATOR
  }

  // PATH GETTERS

  static get speed() {
  	return SPEED
  }

  static get pathAmountPerCycle() {
    return PATH_AMOUNT_PER_CYCLE
  }

  static get pathAmplitude() {
    return PATH_AMPLITUDE
  }

  static get pathFrequency() {
    return PATH_FREQUENCY
  }

}

export default SimulationParams
