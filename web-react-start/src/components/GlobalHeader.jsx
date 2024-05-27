import React from "react";
import './GlobalHeader.css'
import { Link } from "react-router-dom";

const GlobalHeader = () => {
  return (
    <div className="navbar navbar-expand-lg navbar-dark bg-dark">
      <ul className="navbar-nav mr-auto list-unstyled">
            <li className="nav-item"><Link className="nav-link" to="/login">Увійти</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/home">Дім</Link></li>
            <li className="nav-item"> <Link className="nav-link" to="/profile">Профіль</Link></li>
            <li className="nav-item"> <Link className="nav-link" to="/statistics">Статистика</Link></li>
        </ul>
    </div>
  )
} 

export default GlobalHeader;