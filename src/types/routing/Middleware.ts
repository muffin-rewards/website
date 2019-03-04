import { Request } from '@/types/routing/Request'

export type Middleware = (request: Request) => Request
