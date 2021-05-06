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

// fiber 架构
// requestIdleCallback

function workLoop(deadline) {
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }

  // 任务做完统一渲染
  if (!nextUnitOfWork && workInProgressFiber) {
    commitRoot()
  }
  // 空闲注册下一次任务
  requestIdleCallback(workLoop)
}

// 运行任务的函数, 参数是当前的 fiber 任务
function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber)
  }

  if (fiber.return) {
    fiber.return.dom.appendChild(fiber.dom)
  }

  const elements = fiber.children
  let prevSibling = null

  if (elements && elements.length) {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]
      const newFiber = {
        type: element.type,
        props: element.props,
        return: fiber,
        dom: null,
      }

      if (i === 0) {
        fiber.child = newFiber
      } else {
        prevSibling.sibling = newFiber
      }

      prevSibling = newFiber
    }
  }

  // 深度优先
  if (fiber.child) {
    return fiber.child
  }

  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling
    }
    nextFiber = nextFiber.return
  }
}

requestIdleCallback(workLoop)

// 统一操作 dom
function commitRoot() {
  commitRootImpl(workInProgressRoot.child)
  workInProgressRoot = null
}

function commitRootImpl(fiber) {
  if (!fiber) {
    return 
  }

  const parentDom = fiber.return.dom

  if (fiber.effectTag === 'REPLACEMENT' && fiber.dom) {
    parentDom.appendChild(fiber.dom)
  } else if (fiber.effectTag === 'DELETION' && fiber.dom) {
    parentDom.appendChild(fiber.dom)
  } else if (fiber.effectTag === 'UPDATE') {
    updateDom(fiber.dom, fiber, alternate.props, fiber, props)
  }

  // parentDom.appendChild(fiber.dom)

  // 递归操作元素
  commitRootImpl(fiber.child)
  commitRootImpl(fiber.sibling)
}

// recondile 调和
function updateDom(dom , pervProps, nextProps) {
  Object.keys(pervProps)
    .filter(name => name !== 'children')
    .filter(name => !(name in nextProps))
    .forEach(name => {
      if (name.indexOf('on') === 0) {
        dom.removeEventListener(name.substr(2).toLowerCase(), pervProps[name], false)
      } else {
        dom[name] = ''
      }
    })
  
    Object.keys(nextProps)
    .filter(name => name !== 'children')
    .forEach(name => {
      if (name.indexOf('on') === 0) {
        dom.addEventListener(name.substr(2).toLowerCase(), nextProps[name], false)
      } else {
        dom[name] = nextProps[name]
      }
    })
}


export default {
  createElement,
  createTextVDom,
  render,
}