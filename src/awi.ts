import { Awi, Client } from 'awi'

/**
 * The rewards rest endpoint.
 */
export const rewards: () => Client = () => new Awi()
  .use(async req => req.base = 'https://15wt620bm8.execute-api.eu-west-1.amazonaws.com/v1/rewards')
