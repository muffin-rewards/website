import { Awi } from 'awi'

export const rewards = () => new Awi()
  .use(async req => req.base = 'https://15wt620bm8.execute-api.eu-west-1.amazonaws.com/v1/rewards')
