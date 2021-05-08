import React from './react'

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {number: 1}
  }
  render() {
    return this.state.number
  }
}

// function say() {
//   alert(1)
// }

// let element = React.createElement('div', { name: 'xxx' }, 'hello', React.createElement('button', {onClick: say}, '123'))

// console.log('element', element)

React.render(React.createElement(Counter, {
  name: "react"
}), document.getElementById('root'))
