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

function createReactUnit(element) {
  if (typeof element === 'string' || typeof element === 'number') {
    return new ReactTextUnit(element)
  }
}

export default createReactUnit