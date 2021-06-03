import { environmentDefault as defaultEnv } from './environment.default';

export const environment = {
  ...defaultEnv,
  production: false,
  endpoint: 'http://localhost:5656'
};