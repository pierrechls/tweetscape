let instance = null

class PathCalculator {

  constructor() {
    if(!instance){
      instance = this
      this.amplitude = {}
      this.frequency = {}
    }

    return instance
  }

  static setAmplitude(x, y) {
    instance.amplitude.x = x
    instance.amplitude.y = y
  }

  static setFrequency(x, y) {
    instance.frequency.x = x
    instance.frequency.y = y
  }

  static at(offset) {
    let x = instance.amplitude.x*Math.sin(instance.frequency.x*offset*3.1415926535/180)
    let y = instance.amplitude.y*Math.sin(instance.frequency.y*offset*3.1415926535/180)
    let z = -offset

    return {x: x, y: y, z: z}
  }

  static after(offset, position) {
    let x = instance.amplitude.x*Math.sin(instance.frequency.x*offset*3.1415926535/180) + (position === 'left' ? 3 : -3)
    let y = instance.amplitude.y*Math.sin(instance.frequency.y*offset*3.1415926535/180)
    let z = -offset

    return { x: x, y: y, z: z }
  }
}

new PathCalculator()

export default PathCalculator
