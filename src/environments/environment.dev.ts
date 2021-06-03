import { environmentDefault as defaultEnv } from './environment.default';

export const environment = {
  ...defaultEnv,
  production: false,
  id: 'dev',
  name: '개발',
  endpoint: 'http://localhost:5656'
};