import React from './react'


let element = React.createElement('div', { name: 'xxx' }, 'hello', React.createElement('button', {}, '123'))

console.log('element', element)

React.render('React Page', document.getElementById('root'))
