#! /usr/bin/env node

var dev = process.env.NODE_ENV === 'development'
console.log('lib?', dev)
var cli  = require(true ? '../src/index' : '../lib/index').default

cli(process)