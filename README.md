## Solidity Starter Kit

https://github.com/01Clarian/defi-staking-app-starter/tree/main/defi-staking-app-starter

## Project Architecture

## Public Folder

It includes entry point of the app and other links and all

## src Folder

This will have our Components (react)

&& our smart contracts to interact with that components

# Migration

This folder is basically just to make the logic to deploy and update our smart contracts

## Truffle-config file

THis file is basically for building connection or hook up the truffle with ganache (which is our testing blockchain server)#   d e c e n t r a l i z e d - b a n k 
 
 

## Web3 & Blockchain Connection Code  (Meta Mask)

import Web3 from "web3";

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


## What is web3?

## import Web3 from "web3"; 

## web3.js - Ethereum JavaScript API

web3.js is a collection of libraries that allow you to interact with a local or remote ethereum node using HTTP, IPC or WebSocket.

Basically it allow user to interact with ethereum transactional wallets like metamask etc and connect them with our contracts and make transactions possible. 