const { isObject } = require('./utils')

const log = console.log.bind(console)

const createTextElement = (text) => {
  let type = 'TEXT'
  let props = {
    nodeValue: text,
  }
  let c = createElement(type, props)
  return c
}

const createElement = (type, props, ...children) => {
  let newProps = Object.assign({}, props)

  if (children.length === 0) {
    newProps.children = []
  } else {
    let l = children.map(c => {
      if (isObject(c)) {
        return c
      } else {
        let r = createTextElement(c)
        return r
      }
    })
  }
}

let React = {
  createElement: createElement,
}

module.exports = React