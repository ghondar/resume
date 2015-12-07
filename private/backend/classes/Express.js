import helmet from 'helmet';
import express from 'express';
import hogan from 'hogan-express';
import compression from 'compression';
import Class from '../../shared/classes/Class';
import config from '../../config/express-server';
import * as envs from '../../config/envs';
import packageJson from '../../../package.json';

export default class Express extends Class{
  constructor(options){
    options = Object.assign({
    }, options);
    super(options);
  }

  run(){
    return new Promise((resolve, reject) => {
      const app = express();
      const router = express.Router();
      const port = config.port;

      let started = new Date();

      app.set('views', './private/views');
      app.set('view engine', 'html');
      app.engine('html', hogan);
      app.use(helmet());
      app.use(compression());
      if(!envs.__PROD__){
        app.use(helmet.noCache());
      }else{
        app.use(helmet.hsts({
          force: true
        , maxAge: 2592000000
        , includeSubDomains: true
        }));
        app.use(helmet.contentSecurityPolicy({
          defaultSrc: [`'self'`]
        , fontSrc: [`'self'`]
        , imgSrc: [`'self'`, 'data:']
        , scriptSrc: [
            `'self'`, `'unsafe-inline'`, `'unsafe-eval'`
          , 'http://*.facebook.com/', 'https://*.facebook.com/'
          , 'https://*.google-analytics.com', 'http://*.google-analytics.com'
          ]
        , styleSrc: [
            `self'`, `'unsafe-inline'`
          , 'http://*.facebook.com/', 'https://*.facebook.com/'
          , 'https://*.google-analytics.com', 'http://*.google-analytics.com'
          ]
        }));
      }
      app.use('/', router);

      router.get('/version', (req, res) => {
        res.type('json');
        res.send(
          JSON.stringify({
            started: started.toISOString(),
            uptime: (new Date()).getTime() - started.getTime(),
            version: packageJson.version,
            author: {
              name: packageJson.author.name,
              email: packageJson.author.email,
              url: packageJson.author.url
            }
          }, null, '  ')
        );
      });

      router.get('/', (req, res) => {
        res.render('index');
      });

      app.listen(port, (e) => {
        if(e){ reject(e); }
        started = new Date();
        console.log(`Express is listening at ${port}`);
        resolve();
      });
    });
  }
}
