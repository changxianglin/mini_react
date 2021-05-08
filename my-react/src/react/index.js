import $ from 'jquery'
import createReactUnit from './util'
import createElement from './element'

let React = {
  render,
  nextRootIndex: 0,
  createElement,
}


function render(element, container) {
  const createReactUnitInstance = createReactUnit(element)
  const markUp = createReactUnitInstance.getMarkUp(React.nextRootIndex)
  $(container).html(markUp)
}


export default React