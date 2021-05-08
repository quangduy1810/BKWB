import Loading from './component/Loading';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Loadable from 'react-loadable';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
// export default {
//     routes :[
//         {
//             path:'/home',
//             component: Loadable({ loading : Loading, loader: () => import('./Home/App') })
//         }
//     ]




const Home = Loadable({
  loader: () => import('./Home/App'),
  loading: Loading
});


const Login = Loadable({
    loader: () => import('./Home/App'),
    loading: Loading
  });



class App extends Component {
  render() {
    return (
      <Router>
          <Route exact path="/home" component={Home} />
          <Route exact path="/Login" component={Login} />
      </Router>
    );
  }
}

export default App;

ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );