// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract MicroInvestmentPlatform is ReentrancyGuard, Pausable {

    enum Role { Investor, Startup, Admin }

    struct User {
        address wallet;
        Role role;
        bool isVerified;
        string name;
    }

    struct Startup {
        address owner;
        string name;
        string description;
        uint256 fundingGoal;
        uint256 equityOffered;
        uint256 amountRaised;
        bool isVerified;
        bool isFunded;
        uint256 milestonesCompleted;
        uint256 totalMilestones;
    }

    struct Investment {
        address investor;
        uint256 amount;
        uint256 equityShare;
        bool refunded;
        bool boughtBack;
    }

    mapping(address => User) public users;
    mapping(uint256 => Startup) public startups;
    mapping(uint256 => Investment[]) public investments;

    uint256 public startupCount = 0;
    address public admin;

    modifier onlyAdmin() {
        require(users[msg.sender].role == Role.Admin, "Not authorized");
        _;
    }

    modifier onlyVerifiedStartup(uint256 _id) {
        require(startups[_id].isVerified, "Startup not verified");
        _;
    }

    constructor() {
        admin = msg.sender;
        users[msg.sender] = User(msg.sender, Role.Admin, true, "Platform Admin");
    }

    function registerUser(string memory _name, Role _role) public {
        require(users[msg.sender].wallet == address(0), "User already exists");
        users[msg.sender] = User(msg.sender, _role, false, _name);
    }

    function verifyUser(address _user) public onlyAdmin {
        users[_user].isVerified = true;
    }

    function registerStartup(string memory _name, string memory _description, uint256 _goal, uint256 _equity, uint256 _milestones) public {
        require(users[msg.sender].role == Role.Startup, "Only startups can register");
        startups[startupCount] = Startup(msg.sender, _name, _description, _goal, _equity, 0, false, false, 0, _milestones);
        startupCount++;
    }

    function verifyStartup(uint256 _id) public onlyAdmin {
        startups[_id].isVerified = true;
    }

    function invest(uint256 _id) public payable nonReentrant onlyVerifiedStartup(_id) {
        require(msg.value > 0, "Investment amount must be greater than 0");
        uint256 equityShare = (msg.value * startups[_id].equityOffered) / startups[_id].fundingGoal;
        investments[_id].push(Investment(msg.sender, msg.value, equityShare, false, false));
        startups[_id].amountRaised += msg.value;
    }

    function releaseFunds(uint256 _id) public nonReentrant onlyVerifiedStartup(_id) {
        require(startups[_id].milestonesCompleted < startups[_id].totalMilestones, "All milestones reached");
        uint256 amountToRelease = startups[_id].amountRaised / startups[_id].totalMilestones;
        (bool success,) = payable(startups[_id].owner).call{value: amountToRelease}("");
        require(success, "Transfer failed");
        startups[_id].milestonesCompleted++;
    }

    function claimRefund(uint256 _id) public nonReentrant {
        for (uint i = 0; i < investments[_id].length; i++) {
            if (investments[_id][i].investor == msg.sender && !investments[_id][i].refunded) {
                investments[_id][i].refunded = true;
                (bool success,) = payable(msg.sender).call{value: investments[_id][i].amount}("");
                require(success, "Refund failed");
            }
        }
    }

    function buyback(uint256 _id, uint256 _pricePerShare) public nonReentrant onlyVerifiedStartup(_id) {
        require(startups[_id].isFunded, "Startup not funded");
        for (uint i = 0; i < investments[_id].length; i++) {
            if (!investments[_id][i].boughtBack) {
                uint256 amountToPay = investments[_id][i].equityShare * _pricePerShare / 100;
                (bool success,) = payable(investments[_id][i].investor).call{value: amountToPay}("");
                require(success, "Buyback failed");
                investments[_id][i].boughtBack = true;
            }
        }
    }

    function emergencyPause() public onlyAdmin {
        _pause();
    }

    function emergencyUnpause() public onlyAdmin {
        _unpause();
    }

    receive() external payable {}
}
