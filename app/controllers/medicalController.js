const { MedicalContract } = require("../web3/web3Config")

// from => msg.sender

function medicalDetailsController() {
    return {
        grantViewPermission(req, res) {
            const { to_address } = req.body;
            const from_address = req.headers.auth;
            MedicalContract.methods.grantViewPermissionLoc(to_address).send({ from: from_address }).then((response) => {
                res.json(response)
            }).catch(err => res.json(err));
        },

        grantMedicalDetailsFillPermisssion(req, res) {
            const { to_address } = req.body;
            const from_address = req.headers.auth;
            // from_address should be of owner for successful transaction
            MedicalContract.methods.grantMedicalDetailsFillPermisssionLoc(to_address).send({ from: from_address }).then((response) => {
                res.json(response)
            }).catch(err => res.json(err));
        },

        retrieveMedDetails(req, res) {
            const to_address = req.params.id;
            const from_address = req.headers.auth;
            MedicalContract.methods.retrieveMD(to_address).call({ from: from_address }).then((response) => {
                const medDetails = {
                    tpaName: response.tpaName,
                    tpaId: response.tpaId,
                    insuredCode: response.insuredCode,
                    insuredName: response.insuredName,
                    prevPolicyNo: response.prevPolicyNo,
                    mediclaimCpny: response.mediclaimCpny,
                    insurance: response.insurance,
                    bloodGrp: response.bloodGrp
                }
                res.json(medDetails)
            }).catch(err => res.json(err));
        },

        insertMedDetails(req, res) {
            const { to_address } = req.body;
            const from_address = req.headers.auth;
            const {
                tpaName,
                tpaId,
                insuredCode,
                insuredName,
                prevPolicyNo,
                mediclaimCpny,
                insurance,
                bloodGrp
            } = req.body;

            MedicalContract.methods.insertMD(tpaName, tpaId, insuredCode, insuredName, prevPolicyNo, mediclaimCpny, insurance, bloodGrp, to_address)
                .send({ from: from_address, gas: 3000000 })
                .then((response) => {
                    res.json(response)
                }).catch(err => res.json(err));
        }
    }
}

module.exports = medicalDetailsController;