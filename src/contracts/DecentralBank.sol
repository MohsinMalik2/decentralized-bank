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
        owner = msg.sender;
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

        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
        }

        hasStaked[msg.sender] = true;
        isStaking[msg.sender] = true;

    }

    //Sending reward tokens to customers as they stake their tether in our bank
    function issueTokens() public {


        //Only owner can call this function and reward reward tokens to stakers
        require(msg.sender == owner, 'Caller must be the owner');

        for(uint i = 0; i< stakers.length; i++){
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient] / 9;  //9th part of what the customer deposited for staking

            if(balance > 0){
                rwd.transferTo(recipient, balance);
            }
        }

    }

    //Unstaking FUnction
    function withdrawTokens() public payable {
        uint balance = stakingBalance[msg.sender];


        require( balance > 0  , 'Amount cannot be zero or smaller than that');


         //Transfering staked amount from bank to customer

        tether.transferTo(msg.sender, balance);

        //Reset Staking Balance

        stakingBalance[msg.sender] = 0 ;


        //Reset staking status of the customer


        hasStaked[msg.sender] = false;
        isStaking[msg.sender] = false;

    }
      

}