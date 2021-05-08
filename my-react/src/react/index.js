import $ from 'jquery'
import createReactUnit from './util'
import createElement from './element'
import Component from './component'

let React = {
  render,
  nextRootIndex: 0,
  createElement,
  Component,
}


function render(element, container) {
  const createReactUnitInstance = createReactUnit(element)
  const markUp = createReactUnitInstance.getMarkUp(React.nextRootIndex)
  $(container).html(markUp)
  $(document).trigger('mounted')
}


export default React