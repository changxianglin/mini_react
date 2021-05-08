import React from './react'

function say() {
  alert(1)
}

let element = React.createElement('div', { name: 'xxx' }, 'hello', React.createElement('button', {onClick: say}, '123'))

console.log('element', element)

React.render(element, document.getElementById('root'))
