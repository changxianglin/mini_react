// define 声明模块, 通过 requires 使用模块
let factories = {}

// 名字, 依赖, 工厂
function define(moduleName, dependencies, factory) {
  factory.dependencies = dependencies // 挂依赖
  factories[moduleName] = factory
}

function require(mods, callback) {
  let result = mods.map(function (mod) {
    let factory = factories[mod]
    let exports
    let dependencies = factory.dependencies // ['name']
    require(dependencies, function() {
      exports = factory.apply(null, arguments)
    })
    
    return exports
  })

  callback.apply(null, result)
}


define('name', [], function () {
  return 'lin'
})

define('age', ['name'], function (name) {
  return name +  22
})

require(['age'], function (age) {
  console.log(age)
})