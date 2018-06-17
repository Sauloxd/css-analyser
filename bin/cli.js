#! /usr/bin/env node

var dev = process.env.NODE_ENV === 'development'

var cli  = require(dev ? '../src/index' : '../lib/index').default

cli(process)