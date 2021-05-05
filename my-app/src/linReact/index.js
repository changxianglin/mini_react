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

  dom = document.createElement(vDom.type)

  if (typeof (vDom.props.children) === 'string') {
    dom = document.createElement(vDom.type)
    const text = document.createTextNode(vDom.props.children)
    dom.appendChild(text)
  }

  if (vDom.props) {
    Object.keys(vDom.props)
      .filter(key => key !== 'children')
      .forEach(item => {
      dom[item] = vDom.props[item]
    })
  }
  
  if (vDom.props && vDom.props.children && typeof(vDom.props.children) != 'string') {
    render(vDom.props.children, dom)
  }

  container.appendChild(dom)
}

export default {
  render,
}