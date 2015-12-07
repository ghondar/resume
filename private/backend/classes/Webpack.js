import webpack from 'webpack';
import WebpackServer from 'webpack-dev-server';
import Class from '../../shared/classes/Class';
import config from '../../config/webpack';
import configServer from '../../config/webpack-server';

export default class Webpack extends Class{
  constructor(options){
    options = Object.assign({
    }, options);
    super(options);
  }

  run(){
    return new Promise((resolve, reject) => {
      const server = new WebpackServer(webpack(config), configServer);
      const host = config.host;
      const port = config.port;

      server.listen(port, host, (e) => {
        if(e){ reject(e); }
        console.log(`Webpack is listening at ${host}:${port}`);
        resolve();
      });
    });
  }
}
