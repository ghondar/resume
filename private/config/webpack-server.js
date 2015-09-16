import config from './webpack';

let configServer = {
  hot: true
, colors: true
, noInfo: true
, publicPath: config.output.publicPath
, historyApiFallback: true
};
if(config.port === 443){
  configServer.https = true;
}

export default configServer;
