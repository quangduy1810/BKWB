import './App.css';
import NavBar from './components/NavBar';
import Project from './components/Project';
import Board from './components/Board';
import Login from './components/Login';
import { useLocation } from 'react-router';
import {
  Switch,
  Route
} from "react-router-dom";

function App() {
  let location = useLocation();
  return (
    <div className="App">
      <header className="App-header">
      </header>
      {location.pathname!=='/'?<NavBar/>:''}
      <Route path="/" exact component = {Login}/>
      <Switch>
        <Route path="/dashboard" exact component = {Project}/>
        <Route path="/board/:id" exact component = {Board}/>
      </Switch>
    </div>
  );
}

export default App;
