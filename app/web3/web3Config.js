const bankABI = require("../../build/contracts/BankDetails.json").abi
const businessABI = require("../../build/contracts/BusinessDetails.json").abi
const govABI = require("../../build/contracts/GovDetails.json").abi
const eduABI = require("../../build/contracts/EduDetails.json").abi
const medABI = require("../../build/contracts/MedicalDetails.json").abi

// web3 interface
Web3 = require("web3");

// setup a http provider
web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

// Connecting to smart contract
// creating instances
// const AcAddress = '0xFc3A12361c98dfEEE9A4529C41FC847847D4ba71';
const BankAddress = '0x8d8a7139071932c99F17e8736CCc789A0F48de2e';
const BusAddress = '0xe0928F557D62A5aA0064743c02d4B376eE83A1a6';
const EduAddress = '0xFb33F6908c20b0763a4130005C2BB39711cD9260';
const GovAddress = '0x2Cc93fc07ff010422879B0DA4da88D7F74d51CDb';
const MedAddress = '0x532677c4FB55B9DF241cA4127686d17A029a1e18';

let BankContract = new web3.eth.Contract( bankABI, BankAddress );
let BusinessContract = new web3.eth.Contract( businessABI, BusAddress);
let GovDetContract = new web3.eth.Contract( govABI, GovAddress);
let EducationContract = new web3.eth.Contract( eduABI, EduAddress);
let MedicalContract = new web3.eth.Contract( medABI, MedAddress);

module.exports = { BankContract, BusinessContract, GovDetContract, EducationContract, MedicalContract}