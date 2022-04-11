const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function (deployer, network, accounts){
    await deployer.deploy(Tether)
    const tether = await Tether.deployed()   //Now we have access to functions inside Tether contract
 

    await deployer.deploy(RWD)
    const rwd = await RWD.deployed()  //Now we have access to functions inside RWD contract


    await deployer.deploy(DecentralBank ,rwd.address ,tether.address)
    const decentralBank = await DecentralBank.deployed()   //Now we have access to functions inside Tether contract

    // //Transfering all RWD tokens to decentral Bank

    await rwd.transferTo(decentralBank.address , '1000000000000000000000000') 

    // // //Transfering 100 tether tokens to the new investor to get start with
    
    await tether.transferTo(accounts[1] , '100000000000000000000') 


}