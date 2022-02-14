const { BusinessContract } = require("../web3/web3Config")

// from => msg.sender

function businessDetailsController() {
    return {
        grantViewPermission(req, res) {
            const { to_address } = req.body;
            const from_address = req.headers.auth;
            BusinessContract.methods.grantViewPermissionLoc(to_address).send({ from: from_address }).then((response) => {
                res.json(response)
            }).catch(err => res.json(err));
        },

        grantBussinessDetailsFillPermisssion(req, res) {
            const { to_address } = req.body;
            const from_address = req.headers.auth;
            // from_address should be of owner for successful transaction
            BusinessContract.methods.grantBussinessDetailsFillPermisssionLoc(to_address).send({ from: from_address }).then((response) => {
                res.json(response)
            }).catch(err => res.json(err));
        },

        retrieveBusDetails(req, res) {
            let to_address;

            if(!req.params.id){
                to_address = req.headers.auth;
            } else {
                to_address = req.params.id;
            }

            const from_address = req.headers.auth;
            BusinessContract.methods.retrieveBusDet(to_address).call({ from: from_address }).then((response) => {
                const busDetails = {
                    companyName: response.companyName,
                    position: response.position,
                    year: response.year,
                    salary: response.salary
                }
                res.render('formsGET/getBusinessDetails', {busDetails: busDetails, uniqueId: to_address})
            }).catch(err => res.json(err));
        },

        insertBusDetails(req, res) {
            const { to_address } = req.body;
            const from_address = req.headers.auth;
            const { companyName, position, year, salary } = req.body;
            BusinessContract.methods.insertBusDet(companyName, position, year, salary, to_address).send({ from: from_address, gas: 3000000 }).then((response) => {
                res.json(response)
            }).catch(err => res.json(err));
        }
    }
}

module.exports = businessDetailsController;