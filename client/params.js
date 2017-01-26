const PATH_AMOUNT_PER_CYCLE = 150
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

  }

}

export default SimulationParams
