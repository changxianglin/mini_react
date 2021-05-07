import $ from 'jquery'
import createReactUnit from './util'

let React = {
  render,
  nextRootIndex: 0,
}


function render(element, container) {
  const createReactUnitInstance = createReactUnit(element)
  const markUp = createReactUnitInstance.getMarkUp(React.nextRootIndex)
  $(container).html(markUp)
}


export default React