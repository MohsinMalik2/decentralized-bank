//Purpose of this script is just to show that we can call a complete solidity contract just
//using a single script or calling only a single function through terminal 
//For this the command is:

//  truffle exec scripts/issue-tokens.js



const DecentralBank = artifacts.require('DecentralBank');


module.exports = async function issueRewards(callback){
    let dBank = await DecentralBank.deployed();

    await dBank.issueTokens();

    console.log("Tokens has been issued successfully");

    callback();


}