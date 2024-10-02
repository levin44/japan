const express = require('express');
const { checkToken } = require('../middleware/auth');
const applicantController = require('../controllers/applicant.controller');

const router = express.Router();

router.get('/', applicantController.getApplicants);
router.delete('/:id', applicantController.deleteApplicant);
router.put('/:id', applicantController.updateApplicant);

router.post('/', applicantController.createApplicant);
router.get('/:id', applicantController.getApplicantsById);

module.exports = router;