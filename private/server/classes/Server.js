class Server{
  constructor(){
    process.on('uncaughtException', (e) => {
      if(e.code === 'EADDRINUSE'){
        if(process.argv[2] === 'stop'){
          process.kill(fs.readFileSync(pidPath).toString());
          process.exit();
        }
      }
    });

    process.on('exit', () => {
      if(fs.existsSync(pidPath)){
        fs.unlinkSync(pidPath);
      }
    });

    process
      .on('SIGUSR1', process.exit)
      .on('SIGTERM', process.exit)
      .on('SIGPIPE', process.exit)
      .on('SIGHUP', process.exit)
      .on('SIGINT', process.exit)
      .on('SIGBREAK', process.exit)
      .on('SIGWINCH', process.exit)
    ;
  }
}
