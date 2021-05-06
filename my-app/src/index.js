// import React from 'react';
// import ReactDOM from 'react-dom';


import React from './linReact'
// import linCount from './linCount'
const ReactDOM = React

// function App(props) {
//   const jsx2 = React.createElement(
//     'div',
//     { id: 'app2' },
//     React.createElement(
//       'a',
//       {
//         href: "http://www.baidu.com"
//       },
//       '百度'
//     ))
  
//   return (
//     <div>
//       <h1 id="title">{props.title}</h1>
//       <hr></hr>
//       {jsx2}
//       <section>
//         App
//       </section>
//     </div>
//   )
// }

// const jsx3 = (
//   <div id="app2">百度</div>
// )

const App = (
  <div id="app2"><a href="http://www.baidu.com">百度</a></div>
)

ReactDOM.render(
  App,
  document.getElementById('root')
);
