import $ from 'jquery'

class Unit {
  constructor(element) {
    this.currentElement = element
  }
}

class ReactTextUnit extends Unit {
  getMarkUp(rootId) {
    this._rootId = rootId
    return `<span data-reactid="${this._rootId}">${this.currentElement}</span>`
  }
}

class ReactNativeUnit extends Unit {
  getMarkUp(rootId) {
    this._rootId = rootId
    let { type, props } = this.currentElement
    let tagStart = `<${type} data-reactid="${rootId}"`
    let tagEnd = `</${type}>`
    let contentStr

    for (const propName in props) {
      if (/on[A-Z]/.test(propName)) {
        const eventType = propName.slice(2).toLowerCase()
        $(document).on(eventType, `[data-reactid="${rootId}"]`, props[propName])
      } else if (propName === 'children') {
        contentStr = props[propName].map((child, index) => {
          const childInstance = createReactUnit(child)
          return childInstance.getMarkUp(`${rootId}.${index}`)
        }).join()
      } else {
        tagStart += (` ${propName}=${props[propName]}`)
      }
    }

    return tagStart + '>' + contentStr + tagEnd
  }
}

function createReactUnit(element) {
  if (typeof element === 'string' || typeof element === 'number') {
    return new ReactTextUnit(element)
  }
  if (typeof element === 'object' && typeof element.type === 'string') {
    return new ReactNativeUnit(element)
  }
}

export default createReactUnit