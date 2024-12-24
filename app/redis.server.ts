import Redis from 'ioredis'

let redis: Redis

declare global {
  // eslint-disable-next-line no-var
  var __redis__: Redis
}

const redisUrl = process.env.REDIS_URL ?? 'redis://localhost:6379'

if (process.env.NODE_ENV === 'production') {
  redis = new Redis(redisUrl)
} else {
  if (!global.__redis__) {
    global.__redis__ = new Redis(redisUrl)
  }
  redis = global.__redis__
}

export { redis }
