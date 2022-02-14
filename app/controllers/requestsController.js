const Request = require('../models/request')
const { BankContract, BusinessContract, GovDetContract, EducationContract, MedicalContract } = require("../web3/web3Config")

function requestsController() {
    return {
        async requestSent(req, res) {
            try {
                const senderAddress = req.headers.auth;
                const sent_to = req.body.sent_to;

                const senderDoc = await Request.findOneAndUpdate(
                    { address: senderAddress },
                    { $push: { sent: sent_to } },
                    { new: true, upsert: true }
                );

                const receiverDoc = await Request.findOneAndUpdate(
                    { address: sent_to },
                    { $push: { received: senderAddress } },
                    { new: true, upsert: true }
                );

                res.status(200).json("success")
                // res.json(senderDoc, receiverDoc)

            } catch (err) {
                res.json(err)
            }
        },

        async loadSentRequests(req, res) {
            try {
                const address = req.headers.auth;

                const requestsObj = await Request.find(
                    { address: address },
                );

                // res.status(200).json("success")
                res.json(requestsObj)

            } catch (err) {
                res.json(err)
            }
        },

        async loadReceivedRequests(req, res) {
            try {
                const address = req.headers.auth;

                const requestsObj = await Request.find(
                    { address: address },
                );

                // res.status(200).json("success")
                res.json(requestsObj)

            } catch (err) {
                res.json(err)
            }
        },

        async acceptRequests(req, res) {
            try {
                const from_address = req.headers.auth;   //sender
                const { to_address, per_type } = req.body;  // kiski accept ki

                if (per_type === "view") {
                    medResponse = await MedicalContract.methods.grantViewPermissionLoc(to_address).send({ from: from_address });
                    govResponse = await GovDetContract.methods.grantViewPermissionLoc(to_address).send({ from: from_address });
                    eduResponse = await EducationContract.methods.grantViewPermissionLoc(to_address).send({ from: from_address });
                    busResponse = await BusinessContract.methods.grantViewPermissionLoc(to_address).send({ from: from_address });
                    bankResponse = await BankContract.methods.grantViewPermissionLoc(to_address).send({ from: from_address });

                    const afterAccepted1 = await Request.findOneAndUpdate(
                        { address: from_address },
                        {
                            $pullAll: {
                                received: [to_address],
                            }
                        },
                        { new: true }
                    );

                    console.log(afterAccepted1)

                    const afterAccepted2 = await Request.findOneAndUpdate(
                        { address: to_address },
                        {
                            $pullAll: {
                                sent: [from_address],
                            }
                        },
                        { new: true }
                    );

                    console.log(afterAccepted2)

                    res.json("success")
                    // res.json(afterAccepted1, afterAccepted2)
                    
                } else if (per_type === "fill") {
                    const { forDomain } = req.body;

                    if(forDomain === "medical"){
                        medPer = await MedicalContract.methods.grantMedicalDetailsFillPermisssionLoc(to_address).send({ from: from_address });
                    } else if(forDomain === "government"){
                        govPer = await GovDetContract.methods.grantGovernmentDetailsFillPermisssionLoc(to_address).send({ from: from_address });
                    } else if(forDomain === "education"){
                        eduPer = await EducationContract.methods.grantEducationDetailsFillPermisssionLoc(to_address).send({ from: from_address });
                    } else if(forDomain === "business"){
                        busPer = await BusinessContract.methods.grantBussinessDetailsFillPermisssionLoc(to_address).send({ from: from_address });
                    } else if(forDomain === "bank"){
                        bankPer = await BankContract.methods.grantBankDetailsFillPermisssionLoc(to_address).send({ from: from_address });
                    }
                    
                    const afterAccepted1 = await Request.findOneAndUpdate(
                        { address: from_address },
                        {
                            $pullAll: {
                                received: [to_address],
                            }
                        },
                        { new: true }
                    );

                    console.log(afterAccepted1)

                    const afterAccepted2 = await Request.findOneAndUpdate(
                        { address: to_address },
                        {
                            $pullAll: {
                                sent: [from_address],
                            }
                        },
                        { new: true }
                    );

                    console.log(afterAccepted2)

                    res.json("success in fill per")
                    // res.json(afterAccepted1, afterAccepted2)

                }

            } catch (err) {
                res.json(err)
            }

        },

        async rejectRequests(req, res) {
            try {
                const from_address = req.headers.auth;   
                const { to_address } = req.body;

                const afterRejected1 = await Request.findOneAndUpdate(
                    { address: from_address },
                    {
                        $pullAll: {
                            received: [to_address],
                        }
                    },
                    { new: true }
                );

                const afterRejected2 = await Request.findOneAndUpdate(
                    { address: to_address },
                    {
                        $pullAll: {
                            sent: [from_address],
                        }
                    },
                    { new: true }
                );

                res.json("request successfully Rejected")
                // res.json(afterRejected1, afterRejected2)

            } catch (error) {
                res.json(error)
            }
        }
    }
}


module.exports = requestsController