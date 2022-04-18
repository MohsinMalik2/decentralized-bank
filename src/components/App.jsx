import React, {Component} from "react";
import './App.css';
import NavBar from "./navbar/NavBar";
import FootBar from "./footer/FootBar";

import Web3 from "web3";


class App extends Component {


    async componentWillMount(){
        await this.LoadWeb3();
        await this.LoadBchainData();
    }
    //Now to initialize the web3 into react
    //This function connects the app with the blockchain
    async LoadWeb3 (){

        if(window.ethereum){   // metamask detection in present active window
             window.web3 = new Web3(window.ethereum);
             await window.ethereum.enable();
            console.log("1 ethereum browser detected for crypto transaction.")

        }
        else if(window.web3){
            window.web3 = new Web3(window.web3.currentProvider);
            console.log("2 ethereum browser detected for crypto transaction.")

        }
        else{
            alert("No ethereum browser detected for crypto transaction. Go checkout metamask")
        }
    }
    async LoadBchainData (){

       const web3 = window.web3
       const accounts = await web3.eth.getAccounts()
       console.log(accounts)
    }

    constructor(props){
        super(props);
        this.state = {account: '0x098h789sbbb8378'}
    }
    
    render(){
        return (
            <div className="container-fluid">
                <NavBar accNo = {this.state.account}/>
                
                <FootBar/>
            </div>
        )
    }
}


export default App;