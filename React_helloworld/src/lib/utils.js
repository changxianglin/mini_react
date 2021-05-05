const isObject = o => Object.prototype.toString.call(o) === '[object Object]'

const isAttributes = (key) => !key.startWith('on') && key !== 'children'

module.exports = {
  isObject,
  isAttributes,
}