'use strict';

require('babel-core/register');
var fs = require('fs')
  , envs = require('./private/config/envs')
  , Webpack = require('./private/backend/classes/Webpack')
  , Express = require('./private/backend/classes/Express')
  , pidFile = './.pid'
;

const killProcess = function(){
  process.kill(fs.readFileSync(pidFile).toString());
  fs.unlinkSync(pidFile);
  process.exit();
};

process
  .on('SIGUSR1', process.exit)
  .on('SIGTERM', process.exit)
  .on('SIGPIPE', process.exit)
  .on('SIGHUP', process.exit)
  .on('SIGINT', process.exit)
  .on('SIGBREAK', process.exit)
  .on('SIGWINCH', process.exit)
  .on('uncaughtException', (e) => {
    if(e.code === 'EADDRINUSE'){
      if(process.argv[2] === 'stop'){
        killProcess();
      }else{
        process.exit();
      }
    }
  })
;

if(envs.__PROD__){
  console.log('__PROD__');
}else if(envs.__TEST__){
  // ./node_modules/karma/bin/karma start --single-run --browsers PhantomJS
  console.log('__TEST__');
}else{
  Promise.all([
    new Webpack().run()
  , new Express().run()
  ]).then(
    function(){
      fs.writeFileSync(pidFile, process.pid.toString());
      process.on('exit', () => {
        if(fs.existsSync(pidFile)){
          fs.unlinkSync(pidFile);
        }
      });
    }
  , killProcess
  );
}
