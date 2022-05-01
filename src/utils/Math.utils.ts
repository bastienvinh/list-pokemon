class MathUtils {
  private constructor() {}

  static round(nb: number, r: number = 0) {
    return Math.round(nb * Math.pow(10, r)) / Math.pow(10, r)
  }
}

export default MathUtils
