import fs from 'fs';
import webpack from 'webpack';
import WebpackServer from 'webpack-dev-server';
import config from './private/config/webpack';
import configServer from './private/config/webpack-server';

class Express extends Server{
  constructor(){
    export const server = new WebpackServer(webpack(config), configServer);
    const pidPath = './.pids/webpack.pid';

    server.listen(config.port, config.host, (e) => {
      if(e){ throw new Error(e); }
      fs.writeFileSync(pidPath, process.pid.toString());
      console.log(`Webpack is listening at ${config.host}:${config.port}`);
    });
  }
}
