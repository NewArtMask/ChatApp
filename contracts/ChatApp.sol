// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract ChatApp {
    struct user {
        string name;
        friend[] friendList;
    }

    struct friend {
        address pubkey;
        string name;
    }

    struct message {
        address sender;
        uint256 timestamp;
        string msg;
    }

    struct allUsers {
        string name;
        address accountAddress;
    }

    allUsers[] getAllUsers;

    mapping (address => user) userList;
    mapping (bytes32 => message[]) allMessages;

    function checkUserExists(address pubkey) public view returns(bool) {
        return bytes(userList[pubkey].name).length > 0;
    }

    function createAccount(string calldata name) external {
        require(checkUserExists(msg.sender) == false, "User already exists");
        require(bytes(name).length > 0, "Username cannot be empty");

        userList[msg.sender].name = name;
        getAllUsers.push(allUsers(name, msg.sender));
    }

    function getUsername(address pubkey) external view returns(string memory) {
        require(checkUserExists(pubkey), "User is not registered");
        return userList[pubkey].name;
    }

    function addFriend(address friendKey, string calldata name) external {
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friendKey), "User is not registered");
        require(msg.sender != friendKey, "Users cannot add themselves as friends");
        require(checkAlreadyFriends(msg.sender, friendKey) == false, "These users are already friends");

        _addFriend(msg.sender, friendKey, name);
        _addFriend(friendKey, msg.sender, userList[msg.sender].name);
    }

    function checkAlreadyFriends(address pubkey1, address pubkey2) internal view returns(bool) {
        if (userList[pubkey1].friendList.length > userList[pubkey2].friendList.length) {
            address tmp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = tmp;
        }

        for (uint256 i = 0; i < userList[pubkey1].friendList.length; i++) {
            if (userList[pubkey1].friendList[i].pubkey == pubkey2) return true;
        }
        return false;
    }

    function _addFriend(address me, address friendKey, string memory name) internal {
        friend memory newFriend = friend(friendKey, name);
        userList[me].friendList.push(newFriend);
    }

    function getMyFriendList() external view returns(friend[] memory) {
        return userList[msg.sender].friendList;
    }

    function _getChatCode(address pubkey1, address pubkey2) internal pure returns(bytes32) {
        if (pubkey1 < pubkey2) {
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        } else return keccak256(abi.encodePacked(pubkey2, pubkey1));
    }

    function sendMessage(address friendKey, string calldata _msg) external {
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friendKey), "User is not registered");
        require(checkAlreadyFriends(msg.sender, friendKey), "You are not friend with the given user");

        bytes32 chatCode = _getChatCode(msg.sender, friendKey);
        message memory newMessage = message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMessage);
    }

    function readMessage(address friendKey) external view returns(message[] memory) {
        bytes32 chatCode = _getChatCode(msg.sender, friendKey);
        return allMessages[chatCode];
    }

    function getAllAppUsers() public view returns(allUsers[] memory) {
        return getAllUsers;
    }
}