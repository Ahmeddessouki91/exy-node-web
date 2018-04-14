const express = require('express');
const patientRouter = require('./resources/patient/patient.restRouter');

const restRouter = express.Router();

restRouter.use('/patient', patientRouter);

//Error Handle
restRouter.use((error, req, res, next) => {
    console.error(error.stack)
    res.status(500).send(error.message || error.toString())
})

module.exports = restRouter;