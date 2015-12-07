import webpack from 'webpack';
import { __ENV__ } from './envs';

const configs = {
  stop: {}
, dev: {
    host: '127.0.0.1'
  , port: 4000
  }
, prod: {
    host: '127.0.0.1'
  , port: 4000
  , plugins: [
      new webpack.optimize.UglifyJsPlugin()
    ]
  }
, test: {
    host: '127.0.0.1'
  , port: 4000
  }
};
const config = configs[__ENV__];

let publicPath = `${config.host}:${config.port}`;
if(config.port === 443){
  publicPath = `https://${publicPath}`;
}else{
  publicPath = `http://${publicPath}`;
}

export default Object.assign(config, {
  entry: `./private/entry.js`
, output: {
    path: `${__dirname}/public/`
  , filename: 'all.js'
  , publicPath: publicPath
  }
, module: {
    loaders: [{
      test: /\.jsx?$/
    , loader: 'babel-loader'
    , exclude: /(node_modules|bower_components)/
    }, {
      test: /\.css$/
    , loader: 'style-loader!css-loader'
    }]
  }
});
