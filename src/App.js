import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import BoxTabla from "./components/BoxTabla"
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Prueba from './components/Prueba';


class App extends Component {

  BasicExample() {
    return(
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">BoxTabla</Link>
          </li>
          <li>
            <Link to="/Prueba">Prueba</Link>
          </li>
        </ul>
        <Route exact path="/" component={BoxTabla} />
        <Route path="/prueba" component={Prueba} />
      </div>
    </Router>)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="container">
          <div className = "row">
          <this.BasicExample/>
          {/* <Route exact path="/" component={BoxTabla}/> */}
            {/* <BoxTabla/> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;