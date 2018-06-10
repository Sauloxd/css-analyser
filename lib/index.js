"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var Promise = require('bluebird');

var uniq = require('lodash/uniq');

var _ = require('lodash');

var isObject = require('lodash/isObject');

var flatten = require('lodash/flatten');

var exec = Promise.promisify(require('child_process').exec);

var _require = require('fs'),
    writeFileSync = _require.writeFileSync,
    readFileSync = _require.readFileSync;

var subjectPath = '/Users/saulofuruta/QultureRocks/qultureapp';

var sass = require('node-sass');

var minifyCss = require('clean-css');

var printFileSync = function printFileSync(params) {
  return writeFileSync.apply(null, params.concat('utf-8'));
};

var jsPath = "".concat(subjectPath, "/app");
var cssPath = "".concat(subjectPath, "/app/assets/stylesheets");

function buildSass() {
  var sass = require('node-sass');

  sass.render({
    file: cssPath + '/application.scss',
    includePaths: [subjectPath + '/node_modules', subjectPath + '/vendor/assets/bower_components']
  }, function (err, result) {
    console.log('eerr', err); // console.log('result: ', result.stats.includedFiles)

    printFileSync(['css-result.css', result.css]);
    printFileSync(['css-result-files-read.css', JSON.stringify(result.stats.includedFiles, null, 2)]);
    readResult();
  }); // OR
}

var parseCSS = function parseCSS(css) {
  return parse(clean(css), /([^{};]*)([;{}])/g, css = {
    block: []
  }), css;
}; // buildSass()
// readResult()
// getAllTemplatesPaths()


function clean(css) {
  return css.replace(/\/\*[\W\w]*?\*\//g, '') // remove comments
  .replace(/^\s+|\s+$/g, '') // remove trailing spaces
  .replace(/\s*([:;{}])\s*/g, '$1') // remove trailing separator spaces
  .replace(/\};+/g, '}') // remove unnecessary separators
  .replace(/([^:;{}])}/g, '$1;}'); // add trailing separators
}

function refine(css, isBlock) {
  return /^@/.test(css) ? (css = css.split(' ')) && {
    'identifier': css.shift().substr(1).toLowerCase(),
    'parameters': css.join(' ')
  } : (isBlock ? /:$/ : /:/).test(css) ? (css = css.split(':')) && {
    'property': css.shift(),
    'value': css.join(':')
  } : css;
}

function parse(css, regExp, object) {
  for (var m; (m = regExp.exec(css)) != null;) {
    if (m[2] == '{') object.block.push(object = {
      'selector': refine(m[1], true),
      'block': [],
      'parent': object
    });else if (m[2] == '}') object = object.parent;else if (m[2] == ';') object.block.push(refine(m[1]));
  }
}

function readResult() {
  var css = readFileSync('css-result.css', 'utf-8');
  var minified = new minifyCss().minify(css);
  console.log(Object.keys(minified));
  printFileSync(['css-result.min.css', minified.styles]); // remove this block
  // const withoutBlocks = minified.styles.replace(/\{[^\{]*\}/g, '').replace(/\{[^\{]*\}/g, '').replace(/\{[^\{]*\}/g, '').replace(/\{[^\{]*\}/g, '')
  // console.log(parseCSS(minified.styles).block.map(i => i.selector))
  // printFileSync(['css-result-without-blocks.min.css', withoutBlocks])
  // const classes = minified.styles.match(/\.[a-z, \-, \:\:, A-Z, 0-9]*(?=[\{, \,, \., \:, \[])/g)

  var selectorsWithKeyframes = parseCSS(minified.styles).block.reduce(function (acc, obj) {
    if (obj.selector) return acc.concat(obj.selector);
    console.log('NO SELECTOR', obj.selector);
    return acc;
  }, []);
  var selectors = selectorsWithKeyframes.filter(function (i) {
    return !isObject(i);
  }); // console.log(selectors.map(s => s.split(' ')))

  var withoutChildSelector = uniq(selectors.reduce(function (acc, s) {
    return _toConsumableArray(acc).concat(_toConsumableArray(s.split(' ')));
  }));
  var withoutMultipleDefinitionSelector = uniq(withoutChildSelector.reduce(function (acc, s) {
    return _toConsumableArray(acc).concat(_toConsumableArray(s.split(',')));
  })); // console.log(withoutMultipleDefinitionSelector)

  var atLeastOneClass = withoutMultipleDefinitionSelector.reduce(function (acc, selector) {
    var pointPositions = selector.split('').map(function (i, index) {
      return i === '.' ? index : false;
    }).filter(function (a) {
      return _.isNumber(a);
    });
    if (pointPositions.length === 0) return acc;
    var temp = selector.split('.').map(function (i) {
      return '.' + i;
    }).slice(1).filter(function (i) {
      return i.length > 1;
    });
    return _toConsumableArray(acc).concat(_toConsumableArray(temp));
  }, []);
  var uniqClasses = uniq(atLeastOneClass); // console.log('classes', uniqClasses)

  var removeAfterChar = [':', '[', '>', ')', '+', '~', '*'];
  var classes2 = uniqClasses.reduce(function (acc, selector) {
    var removeAfterIndex = removeAfterChar.map(function (char) {
      return selector.indexOf(char);
    }).filter(function (i) {
      return i !== -1;
    }).sort(function (a, b) {
      return a - b;
    })[0];

    if (removeAfterIndex) {
      // console.log(`selector: ${selector}, i: ${removeAfterIndex}`)
      return acc.concat(selector.slice(0, removeAfterIndex));
    }

    return acc.concat(selector);
  }, []); // console.log(uniq(classes2))

  return uniq(classes2);
}

match();

function match() {
  var cssInSlim = JSON.parse(readFileSync('result.json', 'utf-8'));
  console.log('CSS in USE', Object.keys(cssInSlim).length);
  var css = readResult();
  console.log('CSS in TOTAL', css.length);

  var result = _.difference(css, Object.keys(cssInSlim).map(function (i) {
    return '.' + i;
  }));

  writeFileSync('final-result.json', JSON.stringify(result, null, 2));
}