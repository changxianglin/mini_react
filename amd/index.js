// define 声明模块, 通过 requires 使用模块
let factories = {}

// 名字, 依赖, 工厂
function define(moduleName, dependencies, factory) {
  factories[moduleName] = factory
}

function require(mods, callback) {
  let result = mods.map(function (mod) {
    let factory = factories[mod]
    let exports
    exports = factory()
    return exports
  })

  callback.apply(null, result)
}


define('name', [], function () {
  return 'lin'
})

define('age', [], function () {
  return 22
})

require(['name', 'age'], function (name, age) {
  console.log(name, age)
})