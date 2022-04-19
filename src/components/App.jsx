import React, {Component} from "react";
import './App.css';
import NavBar from "./navbar/NavBar";
import FootBar from "./footer/FootBar";

import Web3 from "web3";


class App extends Component {


    async UNSAFE_componentWillMount(){
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
       this.setState({account:accounts[0]});
       
       //Getting the network Id

       const networkId = await web3.eth.net.getId()
        //    console.log(networkId);  // 5777

        //Load up the Tether Contract

        const tetherDate = Tether.networks[networkId];




    }

    constructor(props){
        super(props);

        this.state = {
            account: '0x0',
            tether: {},
            rwd: {},
            dBank: {},
            tetherBalance : "0",
            rwdBalance: "0",
            stakingBalance: "0",
            loading: true

        }

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