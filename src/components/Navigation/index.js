import React, {Component} from 'react'
import './style.css'
import logo from '../../logo.svg'

class Navigation extends Component{

    render(){
        return(
            <nav className = "navbar navbar-header bg-dark">
                <div className= "container-fluid">
                    <ul className="nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/boxtabla">BoxTabla</a>
                    </li>
                    </ul>
                    <h1 className = "title">COINS</h1>
                    <img src={logo} className="Navbar-logo" alt="logo" />
                </div>
            </nav>
        )
    }
}

export default Navigation