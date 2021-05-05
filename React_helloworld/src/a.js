const React = require('./lib/react')
const ReactDOM = require('./lib/react-dom')


const log = console.log.bind(console)

const vdomButton = () => {
  let type = 'button'
  let props = {
    id: 'id-button-login',
    type: 'button',
    onClick: () => console.log('click')
  }
  let children = 'Like'
  let o = React.createElement(type, props, children)
  return o
}

const __main = () => {
  let root = document.getElementById('root')
  let vdom = vdomButton()
  log('vdom', vdom)
  ReactDOM.render(vdom, root)
}