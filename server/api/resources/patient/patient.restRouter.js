const express = require('express');
// import controllers for patient 

const patientRouter = express.Router();

patientRouter.route('/')
    .get((req, res) => res.json({ OK: true }));

patientRouter.route('/:id').get((req, res) => {
    res.json({ id: req.params.id });
});

module.exports = patientRouter;