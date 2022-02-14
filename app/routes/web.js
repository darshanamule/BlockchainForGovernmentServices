var express = require('express');
var router = express.Router();

const bankDetailsController = require('../controllers/bankController')
const businessDetailsController = require('../controllers/businessController')
const govDetailsController = require('../controllers/govDetController')
const eduDetailsController = require('../controllers/educationController')
const medicalDetailsController = require('../controllers/medicalController')
const requestsController = require('../controllers/requestsController')
const searchController = require('../controllers/searchController')


// Bank Details
router.post('/grantViewPerBank', bankDetailsController().grantViewPermission)
router.post('/grantFillBankDet', bankDetailsController().grantBankDetailsFillPermisssion)
router.get('/bankDetails/:id', bankDetailsController().retrieveBankDetails)
router.get('/bankDetails', bankDetailsController().retrieveBankDetails)
router.post('/fillBankDetails', bankDetailsController().insertBankDetails)

// Business Details
router.post('/grantViewPerBus', businessDetailsController().grantViewPermission)
router.post('/grantFillBusinessDet', businessDetailsController().grantBussinessDetailsFillPermisssion)
router.get('/businessDetails/:id', businessDetailsController().retrieveBusDetails)
router.get('/businessDetails', businessDetailsController().retrieveBusDetails)
router.post('/fillBusinessDetails', businessDetailsController().insertBusDetails)

// Government Details
router.get('/govDetails', govDetailsController().retrieveBirthDetails)

router.get('/birthDetails/:id', govDetailsController().retrieveBirthDetails)
router.get('/domicileDetails/:id', govDetailsController().retrieveDomicileDetails)
router.get('/incomeDetails/:id', govDetailsController().retrieveIncomeDetails)
router.get('/casteDetails/:id', govDetailsController().retrieveCasteDetails)

router.get('/birthDetails', govDetailsController().retrieveBirthDetails)
router.get('/domicileDetails', govDetailsController().retrieveDomicileDetails)
router.get('/incomeDetails', govDetailsController().retrieveIncomeDetails)
router.get('/casteDetails', govDetailsController().retrieveCasteDetails)

router.post('/grantViewPerGov', govDetailsController().grantViewPermission)
router.post('/grantFillGovernmentDet', govDetailsController().grantGovernmentDetailsFillPermisssion)

router.post('/fillBirthDetails', govDetailsController().insertBirthDetails)
router.post('/fillDomicileDetails', govDetailsController().insertDomicileDetails)
router.post('/fillIncomeDetails', govDetailsController().insertIncomeDetails)
router.post('/fillCasteDetails', govDetailsController().insertCasteDetails)

// Education Details
router.post('/grantViewPerEdu', eduDetailsController().grantViewPermission)
router.post('/grantFillEduDet', eduDetailsController().grantEducationDetailsFillPermisssion)
router.get('/eduDetails/:id', eduDetailsController().retrieveEduDetails)
router.get('/eduDetails', eduDetailsController().retrieveEduDetails)
router.post('/fillEduDetails', eduDetailsController().insertEduDetails)

// Medical Details
router.post('/grantViewPerMed', medicalDetailsController().grantViewPermission)
router.post('/grantFillMedicalDet', medicalDetailsController().grantMedicalDetailsFillPermisssion)
router.get('/medicalDetails/:id', medicalDetailsController().retrieveMedDetails)
router.get('/medicalDetails', medicalDetailsController().retrieveMedDetails)
router.post('/fillMedicalDetails', medicalDetailsController().insertMedDetails)

// Requests 
router.post('/grantViewOrFillPer', requestsController().acceptRequests)
router.post('/requestSent', requestsController().requestSent)
router.post('/rejectRequest', requestsController().rejectRequests)
router.get('/sentRequests', requestsController().loadSentRequests)
router.get('/receivedRequests', requestsController().loadReceivedRequests)

// Search Routes
router.post('/search', searchController().searchPost)
router.get('/profile/:uniqueId', searchController().loadSearchProfile)
router.get('/home/:uniqueId', searchController().loadHomeSearchProfile)


module.exports = router;