import React from './react'

class SubCounter {
  componentWillMount() {
    console.log('子组件将要挂载')
  }

  componentDidMount() {
    console.log('子组件挂载完成')
  }

  render() {
    return '123'
  }
}

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {number: 1}
  }
  componentWillMount() {
    console.log('父组件将要挂载')
  }
  componentDidMount() {
    console.log('父组件挂载完成')
  }
  render() {
    return <SubCounter />
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
