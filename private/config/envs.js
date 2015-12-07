let envs = process.env || {}
  , argv = process.argv || []
  , env = envs.NODE_ENV || argv[2] || 'dev'
;

export const __STOP__ = env === 'stop';
export const __TEST__ = env === 'test';
export const __PROD__ = env === 'prod';

if(env !== __TEST__ && env !== __PROD__ && env !== __STOP__){
  env = 'dev';
}

export const __DEV__ = env === 'dev';
export const __ENV__ = env;
