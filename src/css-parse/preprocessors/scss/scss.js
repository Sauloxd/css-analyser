import sass from 'node-sass'
import Promise from 'bluebird'
const sassRenderAsync = Promise.promisify(sass.render)

export default class Scss {
  constructor({ entryPoint, includePaths }) {
    this.entryPoint = entryPoint
    this.includePaths = includePaths
  }

  compileAll() {
    return sassRenderAsync({
      file: this.entryPoint,
      includePaths: this.includePaths
    })
  }
}