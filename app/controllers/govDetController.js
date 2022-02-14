const { GovDetContract } = require("../web3/web3Config")

// from => msg.jsoner

function govDetailsController() {
    return {
        // ------- Granting Permissions -------
        grantViewPermission(req, res) {
            const { to_address } = req.body;
            const from_address = req.headers.auth;
            GovDetContract.methods.grantViewPermissionLoc(to_address).send({ from: from_address }).then((response) => {
                res.json(response)
            }).catch(err => res.json(err));
        },

        grantGovernmentDetailsFillPermisssion(req, res) {
            const { to_address } = req.body;
            const from_address = req.headers.auth;
            // from_address should be of owner for successful transaction
            GovDetContract.methods.grantGovernmentDetailsFillPermisssionLoc(to_address).send({ from: from_address }).then((response) => {
                res.json(response)
            }).catch(err => res.json(err));
        },

        // -------- Birth Certificate ----------

        retrieveBirthDetails(req, res) {
            const to_address = req.params.id;
            const from_address = req.headers.auth;
            GovDetContract.methods.retrieveBC(to_address).call({ from: from_address }).then((response) => {
                const birthDetails = {
                    name: response.name,
                    sex: response.sex,
                    dateOfBirth: response.dateOfBirth,
                    placeOfBirth: response.placeOfBirth,
                    nameOfFather: response.nameOfFather,
                    nameOfMother: response.nameOfMother,
                    dateOfRegistration: response.dateOfRegistration
                }
                res.json(birthDetails)
            }).catch(err => res.json(err));
        },

        insertBirthDetails(req, res) {
            const { to_address } = req.body;
            const from_address = req.headers.auth;
            const {
                name,
                sex,
                dateOfBirth,
                placeOfBirth,
                nameOfFather,
                nameOfMother,
                dateOfRegistration
            } = req.body;

            GovDetContract.methods.insertBC(name,
                sex,
                dateOfBirth,
                placeOfBirth,
                nameOfFather,
                nameOfMother,
                dateOfRegistration, to_address).send({ from: from_address, gas: 3000000 }).then((response) => {
                    res.json(response)
                }).catch(err => res.json(err));
        },

        // -------- Domicile Certificate ----------

        retrieveDomicileDetails(req, res) {
            const to_address = req.params.id;
            const from_address = req.headers.auth;
            GovDetContract.methods.retrieveDC(to_address).call({ from: from_address }).then((response) => {
                const domicileDetails = {
                    name: response.name,
                    state: response.state,
                    serialNo: response.serialNo,
                    district: response.district
                }
                res.json(domicileDetails)
            }).catch(err => res.json(err));
        },

        insertDomicileDetails(req, res) {
            const { to_address } = req.body;
            const from_address = req.headers.auth;
            const { name, state, serialNo, district } = req.body;

            GovDetContract.methods.insertDC(name, state, Number(serialNo), district, to_address).send({ from: from_address, gas: 3000000 }).then((response) => {
                res.json(response)
            }).catch(err => res.json(err));
        },

        // -------- Income Certificate ----------

        retrieveIncomeDetails(req, res) {
            const to_address = req.params.id;
            const from_address = req.headers.auth;
            GovDetContract.methods.retrieveIC(to_address).call({ from: from_address }).then((response) => {
                const incomeDetails = {
                    tahsildarKaryalay: response.tahsildarKaryalay,
                    ordinalNo: response.ordinalNo,
                    district: response.district,
                    to: response.to,
                    year: response.year,
                    annualIncome: response.annualIncome
                }
                res.json(incomeDetails)
            }).catch(err => res.json(err));
        },

        insertIncomeDetails(req, res) {
            const { to_address } = req.body;
            const from_address = req.headers.auth;
            const {
                tahsildarKaryalay,
                ordinalNo,
                district,
                to,
                year,
                annualIncome
            } = req.body;

            GovDetContract.methods.insertIC(
                tahsildarKaryalay,
                ordinalNo,
                district,
                to,
                year,
                annualIncome,
                to_address).send({ from: from_address, gas: 3000000 }).then((response) => {
                    res.json(response)
                }).catch(err => res.json(err));
        },

        // -------- Caste Certificate ----------

        retrieveCasteDetails(req, res) {
            const to_address = req.params.id;
            const from_address = req.headers.auth;
            GovDetContract.methods.retrieveCC(to_address).call({ from: from_address }).then((response) => {
                const casteDetails = {
                    daughter_son_of: response.daughter_son_of,
                    district: response.district,
                    tahsil: response.tahsil,
                    to: response.to,
                    caste: response.caste
                }
                res.json(casteDetails)
            }).catch(err => res.json(err));
        },

        insertCasteDetails(req, res) {
            const { to_address } = req.body;
            const from_address = req.headers.auth;
            const { daughter_son_of, district, tahsil, to, caste } = req.body;

            GovDetContract.methods.insertCC(daughter_son_of, district, tahsil, to, caste, to_address).send({ from: from_address, gas: 3000000 }).then((response) => {
                res.json(response)
            }).catch(err => res.json(err));
        },

    }
}

module.exports = govDetailsController;