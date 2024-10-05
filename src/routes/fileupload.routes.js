const express = require('express');
const { checkToken } = require('../middleware/auth');
const fileuploadController = require('../controllers/fileupload.controller');

const router = express.Router();

router.get('/', fileuploadController.getFileuploadsById);
// router.delete('/:id', fileuploadController.deletefileupload);
// router.put('/:id', fileuploadController.updatefileupload);

router.post('/', fileuploadController.createFileupload);
// router.get('/:id', fileuploadController.getfileuploadsById);

module.exports = router;