import fs from 'fs';
import Class from '../../classes/Class';
import { __STOP__ } from '../../config/envs';

export default class Server extends Class{
  constructor(options){
    options = Object.assign({
      pidFile: './.pids/server.pid'
    }, options);
    super(options);

    const _pidFile = this.get('pidFile');

    process
      .on('SIGUSR1', process.exit)
      .on('SIGTERM', process.exit)
      .on('SIGPIPE', process.exit)
      .on('SIGHUP', process.exit)
      .on('SIGINT', process.exit)
      .on('SIGBREAK', process.exit)
      .on('SIGWINCH', process.exit)
      .on('exit', () => {
        if(fs.existsSync(_pidFile)){
          fs.unlinkSync(_pidFile);
        }
      })
      .on('uncaughtException', (e) => {
        if(e.code === 'EADDRINUSE'){
          if(process.argv[2] === 'stop'){
            process.kill(fs.readFileSync(_pidFile).toString());
            process.exit();
          }
        }
      })
    ;

    if(__STOP__){
      return this.stop();
    }
  }

  run(){
    if(__STOP__){
      return this.stop();
    }
  }

  stop(){
    process.kill(fs.readFileSync(this.get('pidFile')).toString());
    process.exit();
  }
}
