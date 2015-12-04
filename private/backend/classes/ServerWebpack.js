import fs from 'fs';
import webpack from 'webpack';
import WebpackServer from 'webpack-dev-server';
import Server from './Server';
import config from '../../config/webpack';
import configServer from '../../config/webpack-server';

export default class ServerWebpack extends Server{
  constructor(options){
    options = Object.assign({
      pidFile: './.pids/webpack.pid'
    }, options);
    super(options);
  }

  run(){
    super.run();

    const server = new WebpackServer(webpack(config), configServer);
    const host = config.host;
    const port = config.port;

    server.listen(port, host, (e) => {
      if(e){ throw new Error(e); }
      fs.writeFileSync(this.get('pidFile'), process.pid.toString());
      console.log(`Webpack is listening at ${host}:${port}`);
    });
  }
}
