'use strict';

require('babel-core/register');
var envs = require('./private/config/envs');

if(envs.__PRODUCTION__){
  console.log('TODO');
}else if(envs.__TEST__){
  // ./node_modules/karma/bin/karma start --single-run --browsers PhantomJS
  console.log('TODO');
}else{
  require('./webpack');
  require('./server');
}
