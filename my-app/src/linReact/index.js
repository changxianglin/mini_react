function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => {
        return typeof child === 'object' ? child : createTextVDom(child)
      })
    }
  }
}

function createTextVDom(text) {
  return {
    type: 'TEXT',
    props: {
      nodeValue: text,
      children: [],
    }
  }
}

function render(vDom, container) {
  let dom
  if (vDom.type === 'a') {
    dom = document.createTextNode(vDom.props.nodeValue)
  } else {
    dom = document.createElement(vDom.type)
  }

  if (vDom.props) {
    Object.keys(vDom.props)
      .filter(key => key !== 'children')
      .forEach(item => {
      dom[item] = vDom.props[item]
    })
  }
  
  if (vDom.props && vDom.props.children && vDom.props.children.length) {
    vDom.props.children.forEach(child => render(child, dom))
  }

  container.appendChild(dom)
}

export default {
  render,
}