import { Awi } from 'awi'

export const rewards = () => new Awi()
  .use(async req => req.base = 'https://q88ck9rk8e.execute-api.eu-west-1.amazonaws.com/v1/rewards')
