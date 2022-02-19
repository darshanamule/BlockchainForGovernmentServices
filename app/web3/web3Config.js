const bankABI = require("../../build/contracts/BankDetails.json").abi
const businessABI = require("../../build/contracts/BusinessDetails.json").abi
const govABI = require("../../build/contracts/GovDetails.json").abi
const eduABI = require("../../build/contracts/EduDetails.json").abi
const medABI = require("../../build/contracts/MedicalDetails.json").abi
const accABI = require("../../build/contracts/AccessControl.json").abi

// web3 interface
Web3 = require("web3");

// setup a http provider
web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

// Connecting to smart contract
// creating instances
const AcAddress = '0x35F25D8Ab2A7e358dd72Af8857FC08a39388436E';
const BankAddress = '0xCFa77Dc31467fC70f939716B515B0D4188b8EcC1';
const BusAddress = '0xf5b46C75f53245199714046f20301F898a9234Fd';
const EduAddress = '0xcDB169CA7f99B502f684505183456d604DdB1E11';
const GovAddress = '0x868D6b11Dd50a51aF83187FfA25b84A8F67baf01';
const MedAddress = '0x5bdcD3C3Ee1F0fe7d2A445d4401ccAbe4883B368';

let BankContract = new web3.eth.Contract( bankABI, BankAddress );
let BusinessContract = new web3.eth.Contract( businessABI, BusAddress);
let GovDetContract = new web3.eth.Contract( govABI, GovAddress);
let EducationContract = new web3.eth.Contract( eduABI, EduAddress);
let MedicalContract = new web3.eth.Contract( medABI, MedAddress);
let AccessContract = new web3.eth.Contract( accABI, AcAddress);

module.exports = { BankContract, BusinessContract, GovDetContract, EducationContract, MedicalContract, AccessContract}