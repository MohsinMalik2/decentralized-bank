pragma solidity ^0.5.0;

import './RWD.sol';
import './Tether.sol';

contract DecentralBank {

    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    RWD public rwd;


    constructor(RWD _rwd ,Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
    } 

   
//Staking FUnction
    function depositTokens(uint256 _amount) public {


         //Transfering tether tokens to thius contract to stake

        tether.transferFrom(msg.sender,address(this), _amount);

        // Transfer means transfering directly or transfer happened by the owner of the token
        //TransferfROM REFERS to the transfering of token through third party after the approval of the owner.


        
    }

}