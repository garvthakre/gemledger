pragma solidity ^0.8.0;
contract DiamondTracker {
    struct Diamond {
        uint id;
        string condition;
        string owner;
        bool verified;
        string imageHash;
    }
    mapping(uint => Diamond) public diamonds;
    uint public diamondCount;
    
    function createDiamond(string memory _condition, string memory _owner, string memory _imageHash) public {
        diamondCount++;
        diamonds[diamondCount] = Diamond(diamondCount, _condition, _owner, false, _imageHash);
    }
    function transferOwnership(uint _id, string memory _newOwner, string memory _newImageHash) public {
        diamonds[_id].owner = _newOwner;
        diamonds[_id].imageHash = _newImageHash;
    }
    function verifyDiamond(uint _id) public {
        diamonds[_id].verified = true;
    }
}
