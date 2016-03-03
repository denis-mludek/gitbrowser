import lscache from 'lscache'
import RepositoryConstants from './../constants/RepositoryConstants'

const keyGenerator = (key, type) => `${type}_${key}`

const CacheService = {
  setCache(key, type, data, duration){
    const keyCache = keyGenerator(key, type)
    lscache.set(keyCache, data, duration)
  },

  getCache(key, type){
    const keyCache = keyGenerator(key, type)
    return lscache.get(keyCache)
  }
}

export default CacheService
