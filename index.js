const path = require('path')
const middleware = require('./lib/middleware')

const transform = keys => keys.map(key => typeof key === 'string'
  ? { name: key, key }
  : { ...key, name: key.name || key.key }
)

module.exports = function NuxtEnv ({ keys }) {
  const { nuxtenv: topLevelConf } = this.options
  const topLevelKeys = topLevelConf ? topLevelConf.keys : []
  const keysToTransform = [...keys, ...topLevelKeys]

  const transformedKeys = transform(keysToTransform)
  this.addServerMiddleware(middleware(transformedKeys))

  const src = path.resolve(__dirname, 'lib/plugin.js')
  this.addPlugin({
    src,
    fileName: 'nuxt-env.js'
  })
}
