import Promise from 'bluebird'
import { exec } from 'child_process'
import glob from 'glob'

const globAsync = Promise.promisify(glob)
const execAsync = Promise.promisify(exec)

export default class SlimrbPreprocessor {
  constructor({ basePath, glob, logError = true }) {
    this.glob = glob
    this.basePath = basePath
    this.logError = logError
  }

  compileAll({ onPathCompile = i => i } = { onPathCompile: i => i }) {
    this.errors = this.logError ? [] : null
    const onPathCompileRawHtml = result => Promise.resolve(onPathCompile(result)).then(() => result)

    return globAsync(this.glob, { cwd: this.basePath })
      .then(paths => Promise.map(paths, path => {
        return execAsync(`slimrb ${this.basePath}/${path}`)
          .then(rawHtml => onPathCompileRawHtml({fullPath: `${this.basePath}/${path}`, rawHtml}))
          .catch(err => this.errors && this.errors.push({ path, err }))
      }, { concurrency: 100 }))
  }
}