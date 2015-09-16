import { __ENV__ } from './envs';

const server = {
  dev: {
    port: 3000
  }
, prod: {
    port: 80
  }
, test: {
    port: 1337
  }
};

export default server[__ENV__];
