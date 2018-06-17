import path from 'path'
import program from 'commander'
import diffStats from '../css-stats'
import { version } from '../../package.json'

program
  .version(version)

program
  .command('difference')
  .alias('diff')
  .description('log a diff of used classes in view and declared classes in style')
  .option('--base-path <path>', 'specify the root project path')
  .option('--style-includes <path> [paths...]', 'specify where sass can try to resolve from, usually node_modules libs', (val, memo) => { memo.push(val); return memo }, [])
  .option('-s, --style <file>', 'specify the input file for stylesheet')
  .option('-v, --view <blob>', 'set a blob to where the classes exists')
  .option('--view-path <path>', 'where to apply blob to')
  .option('-p, --print', 'if should print to screen')
  .action(({
    basePath = path.resolve('.'),
    styleIncludes,
    style,
    view
  }) =>
    diffStats({
      css: {
        entryPoint: path.resolve(basePath, style),
        includePaths: styleIncludes.map(p => path.resolve(basePath, p)) || []
      },
      html: {
        basePath: path.resolve(basePath),
        glob: view
      }
    })
      .then(() => {
        console.log('Runned with the following inputs:')
        console.log('[CSS] Entry point ', path.resolve(basePath, style))
        console.log('[CSS] Included paths ', styleIncludes.map(p => path.resolve(basePath, p)) || [])
        console.log('[HTML] Base path ', path.resolve(basePath))
        console.log('[HTML] Glob ', view)
      })
  ).on('--help', () => {
    console.log('\n  Examples:')
    console.log(`
    $ css-analyser diff /
        --base-path /Users/saulofuruta/QultureRocks/qultureapp /
        --style ./app/assets/stylesheets/application.scss /
        --style-includes ./node_modules /
        --style-includes ./vendor/assets/bower_components /
        --view app/**/*.slim /
    `)
  })

export default process => program.parse(process.argv)