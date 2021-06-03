import { environmentDefault as defaultEnv } from './environment.default';

export const environment = {
  ...defaultEnv,
  production: true,
  id: 'prod',
  name: '운영',
  endpoint: 'http://localhost:5656'
};