const { EducationContract } = require("../web3/web3Config")

// from => msg.sender

function educationDetailsController() {
    return {
        grantViewPermission(req, res) {
            const { to_address } = req.body;
            const from_address = req.headers.auth;
            EducationContract.methods.grantViewPermissionLoc(to_address).send({ from: from_address }).then((response) => {
                res.json(response)
            }).catch(err => res.json(err));
        },

        grantEducationDetailsFillPermisssion(req, res) {
            const { to_address } = req.body;
            const from_address = req.headers.auth;
            // from_address should be of owner for successful transaction
            EducationContract.methods.grantEducationDetailsFillPermisssionLoc(to_address).send({ from: from_address }).then((response) => {
                res.json(response)
            }).catch(err => res.json(err));
        },

        async retrieveEduDetails(req, res) {
            const to_address = req.params.id;
            const from_address = req.headers.auth;
            let cnt = 0;
            let eduDetails = []

            EducationContract.methods.retLength(to_address).call().then(async (cntValue) => {
                cnt = Number(cntValue);
                if(cnt === 0){
                    res.json({ empty: "No data Exists"})
                } else {
                    for(let i = 0; i < cnt; i++){
                        const response = await EducationContract.methods.retrieveED(to_address, i).call({ from: from_address })
                        eduDetails.push({
                            board: response.board, 
                            name: response.name, 
                            course: response.course, 
                            year: response.year, 
                            seatNo: response.seatNo, 
                            percentage: response.percentage
                        })
    
                    }
                    res.json(eduDetails)
                }
            })
            .catch(err => res.json(err));

        },

        insertEduDetails(req, res) {
            const { to_address } = req.body;
            const from_address = req.headers.auth;
            const { board, name, course, year, stNo, percentage } = req.body;
            EducationContract.methods.insertED(board, name, course, year, stNo, percentage, to_address).send({ from: from_address, gas: 3000000 }).then((response) => {
                res.send(response)
            }).catch(err => res.send(err));
        }
    }
}

module.exports = educationDetailsController;