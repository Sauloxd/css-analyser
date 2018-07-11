import ora from 'ora'

let spinner = {
  stopAndPersist: () => spinner,
  start: () => spinner,
  fail: () => spinner,
  succeed: () => spinner
}

export const start = () => spinner = ora('Css analysis started').start()
export const queueMessage = (message) => spinner.text = message
export const succeed = (message) => spinner.succeed(message)
export const fail = (message) => spinner.fail(message)
export const persist = (...args) => {
  spinner = spinner.stopAndPersist(args[0])
  spinner.start('loading')
}

