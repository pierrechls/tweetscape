const PATH_AMOUNT_PER_CYCLE = 150
const TWEETS = {
  width: 160,
  height: 90
}

class SimulationParams {
  static get path_amount_per_cycle() {
    return PATH_AMOUNT_PER_CYCLE
  }

  static get tweets() {
    return TWEETS
  }

}

export default SimulationParams