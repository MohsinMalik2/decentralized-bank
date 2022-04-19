import React, {Component} from "react";
import './App.css';
import NavBar from "./navbar/NavBar";
import FootBar from "./footer/FootBar";

import Web3 from "web3";
import Tether from '../truffle_abis/Tether.json'
import Rwd from '../truffle_abis/RWD.json'
import DBank from '../truffle_abis/DecentralBank.json'

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

        const tetherData = Tether.networks[networkId];

        if(tetherData){
            const tether = new web3.eth.Contract(Tether.abi,tetherData.address)
            this.setState({tether});
            console.log(tether,"tether")

            let tetherBal = await tether.methods.balanceOf(this.state.account).call();
            this.setState({tetherBalance: tetherBal.toString()});

            console.log(this.state.tetherBalance,"tetherBalance")


        }
        else{
            alert("Tether Contract not detected");
        }

         //Load up the Reward Tokken Contract

         const rwdData = Rwd.networks[networkId];

         if(rwdData){
             const rwd = new web3.eth.Contract(Rwd.abi,rwdData.address)
             this.setState({rwd});
             console.log(rwd,"rwd")
 
             let rwdBal = await rwd.methods.balanceOf(this.state.account).call();
             this.setState({rwdBalance: rwdBal.toString()});
 
             console.log(this.state.rwdBalance,"Reward Balance")
 
 
         }
         else{
             alert("Reward Contract not detected");
         }


         //Load up the Decentral Bank Contract

         const dBankData = DBank.networks[networkId];

         if(dBankData){

             const dBank = new web3.eth.Contract(DBank.abi,dBankData.address)
             this.setState({dBank});
             console.log(dBank,"dBank")
 
             let dBankBal = await dBank.methods.stakingBalance[this.state.account];
             this.setState({stakingBalance: dBankBal});
 
             console.log(this.state.stakingBalance,"Staking Balance")
 
 
         }
         else{
             alert("Reward Contract not detected");
         }

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