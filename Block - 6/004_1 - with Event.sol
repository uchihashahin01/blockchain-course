//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract EventExample {

    mapping(address => uint) public tokenBalance;

    event tokenSend(address _from, address _to, uint _amount); //new line added event for tokenSend

    constructor() {
        tokenBalance[msg.sender] = 100;
    }

    function sendToken(address _to, uint _amount) public returns (bool) {
        require(tokenBalance[msg.sender] >= _amount, "Not enough tokens");
        tokenBalance[msg.sender] -= _amount;
        tokenBalance[_to] += _amount;

        emit tokenSend(msg.sender, _to, _amount); //new line added event for tokenSend
       
        return true;
    }
}
