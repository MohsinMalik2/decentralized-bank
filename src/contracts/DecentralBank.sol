pragma solidity ^0.5.0;

import './RWD.sol';
import './Tether.sol';

contract DecentralBank {

    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers; //Total stakers

    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked; // to check the customer stakes before
    mapping(address => bool) public isStaking; // to check in this transaction customer is staking or not

    constructor(RWD _rwd ,Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
    } 

   
//Staking FUnction
    function depositTokens(uint256 _amount) public payable {

        require( _amount > 0  , 'Amount cannot be zero or smaller than that');
         //Transfering tether tokens to thius contract to stake
        tether.transferFrom(msg.sender, address(this), _amount);

        // Transfer means transfering directly or transfer happened by the owner of the token
        //TransferfROM REFERS to the transfering of token through third party after the approval of the owner.


        //Getting record of balance amount

        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount ;


        //Check if not staked before

        // if(!hasStaked[msg.sender]){
        //     stakers.push(msg.sender);
        // }

        // hasStaked[msg.sender] = true;
        // isStaking[msg.sender] = true;

    }

}