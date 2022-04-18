import React, {Component} from "react";

import Pic from "../navbar/bank.png"


class NavBar extends Component {

    render(){
        return (
            <nav className="navbar navbar-dark bg-primary fixed-top">
                <a href="/" className="navbar-brand col-sm-3 col-md-2 mr-0 text-white">
                    <img src={Pic} alt="" width="50" height="30"style={{verticalAlign: "sub"}}/> &nbsp; Decentralized Banking System
                </a>

                <ul className="navbar-nav px-3 text-white">
                    <li>
                        <small>Account no: {this.props.accNo}</small>
                    </li>
                </ul>
            
            </nav>
        )
    }


}

export default NavBar;