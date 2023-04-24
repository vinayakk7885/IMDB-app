import React from 'react';
// import {connect} from 'react-redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import {createStore,applyMiddleware} from "redux";
import './index.css';
import App from './components/App';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { combineReducers } from './reducers';

// const logger =function ({dispatch,getState}){
//   return function (next){
//     return function (action){
//       console.log("ACTION TYPE : ",action.type);
//       next(action);
//     }
//   }
// }
const logger = ({dispatch,getState}) => (next) => (action) =>{
  // if(typeof action !=='function'){
  //   console.log("ACTION TYPE : ",action.type);
  // }
  next(action);
}

// export const StoreContext=createContext();
// class Provider extends React.Component{
//   render(){
//     const {store}=this.props;
//     return (
//       <StoreContext.Provider value={store}>
//         {this.props.children}
//       </StoreContext.Provider>
//     )
//   }
// }
// export function connect(callback){
//   return function(Component){
//     class connectedComponent extends React.Component{
//       constructor(props){
//         super(props);
//         this.unsubscribe=this.props.store.subscribe(()=>this.forceUpdate());
//       }
//       componentWillUnmount(){
//         this.unsubscribe();
//       }
//       render(){
//         const {store}=this.props;
//         const state=store.getState();
//         const dataToBeAsPasssedAsProps=callback(state);
//         return(
//           <Component {...dataToBeAsPasssedAsProps} dispatch={store.dispatch}/>
//         );
//       }
//     }
//     class connectedComponentWrapper extends React.Component{
//       render(){
//         return (
//           <StoreContext.Consumer>
//             {(store) => <connectedComponent store={store} />}
//           </StoreContext.Consumer>
//         );
//       }
//     }
//     return  connectedComponentWrapper;
//   }
// }
// const thunk = ({dispatch,getState}) => (next) => (action) =>{
//   if(typeof action ==='function'){
//     action(dispatch);
//     return;
//   }
//   next(action);
// }

const store =createStore(rootReducer,applyMiddleware(logger,thunk));
// console.log("store",store);
// console.log('state',store.getState());
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);