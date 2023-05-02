import React,{Component} from "react";
//import logo from './logo.svg';
import './App.css';
import './index.css';
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import FisicoADD from "./components/add-fisicoculturismo.component.js";
import FisicoList from "./components/fisicoculturismo-list.component.js";

class App extends Component {
  render() {
    return (
      <section>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            Principal
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <h2>The Bodybuilding World!</h2>
          <Routes>
            <Route path="/" element={<FisicoList />} />
            <Route path="add" element={<FisicoADD />} />
          </Routes>
        </div>
      </section>
    );
  }
}

export default App;