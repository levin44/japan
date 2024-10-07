const applicantService = require('../services/applicant.service');
const multer = require('multer');
const path = require('path');
require('dotenv').config(); 

const storage = multer.diskStorage({
  destination: process.env.FILE_UPLOAD, // You can set a different path if needed
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
   
const upload = multer({ storage }).fields([
{ name: 'personalPhoto' },
{ name: 'cv' },
{ name: 'interview' },
{ name: 'ptTest' },
{ name: 'ptTestCertificate' },
{ name: 'passportCopy' },
{ name: 'driverLicense' },
{ name: 'qualificationEducation' },
{ name: 'qualificationWorking' }
]);

module.exports = {
  
  createApplicant: (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(500).json({ success: 0, message: 'File upload failed: ' + err.message });
      }

      // Log the incoming form data and file paths
      console.log('Request body:', req.body); // Should contain text fields
      console.log('Request files:', req.files); // Should contain uploaded file data

      const formData = req.body; // Text fields (e.g., fullName, email, etc.)
      const {
        personalPhoto, cv, interview, ptTest, ptTestCertificate, passportCopy, driverLicense, qualificationEducation, qualificationWorking
      } = req.files;
      
      const fileData = {
        personalPhoto: req.files.personalPhoto ? req.files.personalPhoto[0].path : null,
        cv: req.files.cv ? req.files.cv[0].path : null,
        interview: interview ? interview[0].path : null,
        ptTest: ptTest ? ptTest[0].path : null,
        ptTestCertificate: ptTestCertificate ? ptTestCertificate[0].path : null,
        passportCopy: passportCopy ? passportCopy[0].path : null,
        driverLicense: driverLicense ? driverLicense[0].path : null,
        qualificationEducation: qualificationEducation ? qualificationEducation[0].path : null,
        qualificationWorking: qualificationWorking ? qualificationWorking[0].path : null,
      };

      // Now call your service to handle saving the data
      applicantService.createApplicant(formData, fileData, (err, results) => {
        if (err) {
          return res.status(500).json({ success: 0, message: err.message });
        }
        return res.status(200).json({ success: 1, data: results });
      });
    });
  },

  getApplicantsById: (req, res) => {
    const id = req.params.id;
    applicantService.getApplicantsById(id, (err, results) => {
      if (err) {
        return res.status(404).json({ success: 0, message: err.message });
      }
      return res.status(200).json({ success: 1, data: results });
    });
  },

  getApplicantsByDepartment: (req, res) => {
    const id = req.params.id;
    applicantService.getApplicantsByDepartment(id, (err, results) => {
      if (err) {
        return res.status(404).json({ success: 0, message: err.message });
      }
      return res.status(200).json({ success: 1, data: results });
    });
  },

  getApplicants: (req, res) => {
    applicantService.getApplicants((err, results) => {
      if (err) {
        return res.status(500).json({ success: 0, message: err.message });
      }
      return res.status(200).json({ success: 1, data: results });
    });
  },

  updateApplicant: (req, res) => {
    const id = req.params.id
    upload(req, res, (err) => {
      if (err) {
        return res.status(500).json({ success: 0, message: 'File upload failed: ' + err.message });
      }

      // Log the incoming form data and file paths
      console.log('Request body:', req.body); // Should contain text fields
      console.log('Request files:', req.files); // Should contain uploaded file data

      const formData = req.body; // Text fields (e.g., fullName, email, etc.)
      const {
        personalPhoto, cv, interview, ptTest, ptTestCertificate, passportCopy, driverLicense, qualificationEducation, qualificationWorking
      } = req.files;
      
      const fileData = {
        personalPhoto: req.files.personalPhoto ? req.files.personalPhoto[0].path : null,
        cv: req.files.cv ? req.files.cv[0].path : null,
        interview: interview ? interview[0].path : null,
        ptTest: ptTest ? ptTest[0].path : null,
        ptTestCertificate: ptTestCertificate ? ptTestCertificate[0].path : null,
        passportCopy: passportCopy ? passportCopy[0].path : null,
        driverLicense: driverLicense ? driverLicense[0].path : null,
        qualificationEducation: qualificationEducation ? qualificationEducation[0].path : null,
        qualificationWorking: qualificationWorking ? qualificationWorking[0].path : null,
      };


      applicantService.updateApplicant(id,formData, fileData, (err, results) => {
        if (err) {
          return res.status(500).json({ success: 0, message: err.message });
        }
        return res.status(200).json({ success: 1, message: 'Updated successfully' });
      });
    });
    
  },

  deleteApplicant: (req, res) => {
    const id = req.params.id;
    applicantService.deleteApplicant(id, (err, results) => {
      if (err) {
        return res.status(500).json({ success: 0, message: err.message });
      }
      return res.status(200).json({ success: 1, message: 'User deleted successfully' });
    });
  },

  login: (req, res) => {
    const data = req.body;
    userService.login(data, (err, results) => {
      if (err) {
        return res.status(401).json({ success: 0, message: err.message });
      }
      return res.status(200).json({ success: 1, Login: true, message: 'Login successfully', token: results.token });
    });
  },



};
