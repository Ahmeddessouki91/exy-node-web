const express = require('express');
const patientRouter = require('./resources/patient/patient.restRouter');

const restRouter = express.Router();

restRouter.use('/patient', patientRouter);

//Error Handle


module.exports = restRouter;