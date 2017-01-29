// TWEET PARAMS
const TWEET_SEPARATOR = 10
const TWEET_SIZE = { width: 512, height: 512 }

// PATH PARAMS
const SPEED = 50
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
