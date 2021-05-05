const { isAttributes } = require('./utils')

const ReactDOM = {
  render: (vdom, container) => {
    let { type, props } = vdom
    let element = null
    if (type === 'TEXT') {
      element = document.createTextNode('')
    } else {
      element = document.createElement(type)
    }

    Object.keys(props).filter(e => e.startsWith('on'))
      .forEach(k => {
        let eventType = k.toLowerCase().slice(2)
        element.addEventListener(eventType, props[k])
      })
    
    Object.keys(props).filter(e => isAttributes(e))
      .forEach(k => {
        element[k] = props[k]
      })
    
    let children = props.children || []

    children.forEach(c => ReactDOM.render(c, element))

    container.appendChild(element)
  }
}

module.exports = ReactDOM