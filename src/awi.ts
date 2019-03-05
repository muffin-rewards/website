import { Awi, Client } from 'awi'

/**
 * The rewards rest endpoint.
 */
export const base: () => Client = () => new Awi()
 .use(async req => req.base = 'https://15wt620bm8.execute-api.eu-west-1.amazonaws.com/v1')

/**
 * The rewards rest endpoint.
 */
export const rewards: () => Client = () => base()
  .use(async req => req.base = `${req.base}/rewards`)

/**
 * The mentions rest endpoint.
 */
export const mentions: () => Client = () => base()
  .use(async req => req.base = `${req.base}/mentions`)
