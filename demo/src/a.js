
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    // if (this.state.liked) {
    //   return 'You liked this.';
    // }

    // return e(
    //   'button',
    //   { onClick: () => this.setState({ liked: true }) },
    //   'Like'
    // );
    return (
      <div>button</div>
    )
  }
}

const domContainer = document.querySelector('#root');
// ReactDOM.render(e(LikeButton), domContainer);

ReactDOM.render(<App />, domContainer)