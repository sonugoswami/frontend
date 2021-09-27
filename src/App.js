import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"; 
import logo from './logo.svg';
import './App.css';
import Dashboard from './component/dashboard'

function App() {
  return (
    <Router>
      <div className="App">
          <Switch>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
