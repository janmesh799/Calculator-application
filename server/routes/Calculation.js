const express = require('express');
const fetchUser = require('../middleware/fetchUser.js');

const router = express.Router();

router.post('/addcalculation', fetchUser, require('./calculation/addCalculation.js'))

router.delete('/deletecalculation',fetchUser, require('./calculation/deleteCalculation.js'))

router.get('/getallCalculations',fetchUser, require('./calculation/getAllCalculations.js'))

router.delete('/deleteAllCalculations', fetchUser, require('./calculation/deleteAllCalculations.js'))
module.exports = router;