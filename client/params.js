const PATH_AMOUNT_PER_CYCLE = 100
const SPEED = 1.0/10
const TWEET_SIZE = {
  width: 512,
  height: 512
}

class SimulationParams {
  static get path_amount_per_cycle() {
    return PATH_AMOUNT_PER_CYCLE
  }

  static get tweetSize() {
    return TWEET_SIZE
  }

  static get duration() {
  	return 1.0/SPEED;
  }

}

export default SimulationParams
