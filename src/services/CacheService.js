import lscache from 'lscache'

/* ---------------- exports ---------------- */

export function setCache(key, type, data, duration){
  const keyCache = keyGenerator(key, type)
  lscache.set(keyCache, data, duration)
}

export function getCache(key, type){
  const keyCache = keyGenerator(key, type)
  lscache.flushExpired()
  return lscache.get(keyCache)
}

/* ---------------- functions ---------------- */

const keyGenerator = (key, type) => {
  const keyLowered = key.toLowerCase()
  return `${type}_${keyLowered}`
}
