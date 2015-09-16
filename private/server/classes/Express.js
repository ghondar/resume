import fs from 'fs';
import helmet from 'helmet';
import express from 'express';
import hogan from 'hogan-express';
import compression from 'compression';
import config from './private/config/server';
import * as envs from './private/config/envs';
import packageJson from './package.json';

class Express extends Server{
  constructor(){
    const app = express();
    const router = express.Router();
    const pidPath = './.pids/express.pid';

    let started;

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

    app.listen(config.port, (e) => {
      if(e){ throw new Error(e); }
      started = new Date();
      fs.writeFileSync(pidPath, process.pid.toString());
      console.log(`Express is listening at ${config.port}`);
    });
  }
}
