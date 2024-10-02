const express = require('express');
const { checkToken } = require('../middleware/auth');
const designationController = require('../controllers/applicant.controller');

const router = express.Router();

router.get('/', designationController.getApplicants);
router.delete('/:id', designationController.deleteApplicant);
router.put('/:id', designationController.updateApplicant);

router.post('/', designationController.createApplicant);
router.get('/:id', designationController.getApplicantsById);

module.exports = router;