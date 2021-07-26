import './App.css';
import NavBar from './components/NavBar';
import Project from './components/Project';
import Board from './components/Board';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
        </header>
        <NavBar/>
        <Switch>
          <Route path="/" exact component = {Project}/>
          <Route path="/board/:id" exact component = {Board}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
