import lscache from 'lscache'
import RepositoryConstants from './../constants/RepositoryConstants'

const keyGenerator = (key, type) => {
  const keyLowered = key.toLowerCase()
  return `${type}_${keyLowered}`
}

const CacheService = {
  setCache(key, type, data, duration){
    const keyCache = keyGenerator(key, type)
    lscache.set(keyCache, data, duration)
  },

  getCache(key, type){
    const keyCache = keyGenerator(key, type)
    lscache.flushExpired()
    return lscache.get(keyCache)
  }
}

export default CacheService
