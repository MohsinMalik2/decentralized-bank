pragma solidity ^0.5.0;


contract Tether {

    string public name  = 'Moch Tether Token';
    string public symbol = 'Teth';
    uint256 public supplyTotal = 1000000000000000000000000;  //1 million tokens i.e. 1 ethereum == 10^18
    uint8 public decimal = 18;

    event Transfer (
        address indexed _from,
        address indexed _to,
        uint256 _value
    );
    event Approval (
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping (address => uint256) public balanceOf;

    // To let the sender give approval like a confirmation button 
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() public {
        balanceOf[msg.sender] = supplyTotal;
    }

    //function is when tthe sender is the owner of contract publisher which is the owner actually

    function transferTo(address _to,uint256 _value) public returns (bool success) {  

        require(balanceOf[msg.sender] >= _value);
        
        // balanceOf[msg.sender] = balanceOf[msg.sender] - _value;
        balanceOf[msg.sender] -= _value;  //optimized version of upper equation
        balanceOf[_to] += _value;  
        emit Transfer(msg.sender, _to, _value);
        return true;

    }



    //function is when the sender is the consumer of contract sending his token to someone else

    function approve (address _spender, uint256 _value) public returns (bool success){
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    
    function transferFrom(address _from,address _to,uint256 _value) public returns (bool success) {  
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[msg.sender][_from]);
        // balanceOf[msg.sender] = balanceOf[msg.sender] - _value;
        balanceOf[_from] -= _value;  //optimized version of upper equation
        balanceOf[_to] += _value;  

        allowance[_from][msg.sender] -= _value;
        
        emit Transfer(_from, _to, _value);
        return true;

    }
}