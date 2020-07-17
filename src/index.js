// import React from './ZReact/index';
// import React from 'react';
const React = require('./react/lib/React.js')
const ReactDOM = require('./react-dom/lib/ReactDOM.js')
console.log(React)
console.log(ReactDOM)
// import ReactDOM from 'react-dom';
// import ReactDOM from './ZReact/ReactDOM';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

var FuncComponent = (props)=>{
  console.log(props)
  return (
    <div className="box" onClick={()=>{console.log(1111111)}}>函数组件{props.name}</div>
  )
}

// class ClassComponent extends React.Component{
//   constructor(props){
//     super(props)
//     this.state = {
//       name: 123
//     }
//   }
//   handlerClick(){
//     this.setState({
//       name: this.state.name+1
//     })
    
//     this.setState({
//       name: this.state.name+1
//     })

//     this.setState((preState)=>{
//       console.log('preState.namepreState.name',preState.name)
//       return {
//         name: preState.name+1
//       }
//     })

//     this.setState((preState)=>{
//       console.log('preState.namepreState.name',preState.name)
//       return {
//         name: preState.name+1
//       }
//     })
    
//     console.log(this.state.name)
//   }
//   render(){
//     return <div className="box">类组件{this.props.name}
//       <div>
//         {this.state.name}
//       </div>
//       <button onClick={this.handlerClick.bind(this)}>点击</button>
//     </div>
//   }
// }

let jsx = (
  <div>
    文本
    <div name={123} className="box">div元素</div>
    <FuncComponent name='123' /> 
    {/* <ClassComponent name="abc" data={1} /> */}
  </div>
)

// console.log(jsx)
ReactDOM.render(
  jsx,
  document.getElementById('root')
);

// serviceWorker.unregister();
