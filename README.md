# css-analyser
This node CLI analyses your static assets, mainly your css, trying to generate a report so you can optimize your codebase based on its result!

## Motivation
Why? Well I was looking for a package to do something as simple as parsing all my view files (html, slimrb, futurely pug) generate a huuuge list with all used CSS classes, then compile my stylesheets (only scss for now), and try to instersect them classes to generate a list of unused CSS classes.

Of course, this library is just a naive one, since it does not render the actual app (hello SPAs, i'm talking to you), so if Javascript add some dynamic classes, it won't be part of the `used classes list`.

Another thing to be improved is the 3rd party CSS. When importing a library it will bundle up (if correctly `@imported` in your scss) lots of 3rd party CSS. Besides the dynamic problem, you are most likely not using all those classes. But my reporter has no way (for now) of deciding if it should ignore some 3rd party CSS or not.

## How to use

```
$ npm install -g css-analyser
```

```
$ css-analyser diff --help

Usage: difference|diff [options]

log a diff of used classes in view and declared classes in style

Options:

  --base-path <path>                  specify the root project path
  --style-includes <path> [paths...]  specify where sass can try to resolve from, usually node_modules libs (default: )
  -s, --style <file>                  specify the input file for stylesheet
  -v, --view <blob>                   set a blob to where the classes exists
  --verbose <bool>                    verbose mode
  -p, --print                         if should print to screen
  -h, --help                          output usage information

Examples:

  $ css-analyser diff /
      --base-path /Users/sauloxd/base-path /
      --style ./app/assets/stylesheets/application.scss /
      --style-includes ./node_modules /
      --style-includes ./vendor/assets/bower_components /
      --view "app/**/*.slim,app/**/*.html" /
```

## Report Types
### Difference
Generates the difference in classes being declared in you stylesheets with the current used classed parsed in your view files.

Basically you pass a `glob` of view files (only `html` and `slimrb` can be used for now!), and you pass an entrypoint for your scss files, with `style-includes` paths so it can resolve the dependencies for your 3rd party css (in case you have some vendors under some dir besides node_modules 🤮)

It results in a file name `css-analyser__diff.log` with an array of all """"unused"""" classes (maybe 60% accurate? 😜)


## What's next?
This a poc actually, maybe it makes sense, maybe it does not, if you are not rendering your app (jsx 🤧)
If it someone tells me it make sense, maybe for some basic MPA apps, I'll actually work on improving it.