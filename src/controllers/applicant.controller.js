const designationService = require('../services/applicant.service');

module.exports = {
  createApplicant: (req, res) => {
    const data = req.body;
    designationService.createApplicant(data, (err, results) => {
      if (err) {
        return res.status(500).json({ success: 0, message: err.message });
      }
      return res.status(200).json({ success: 1, data: results });
    });
  },

  getApplicantsById: (req, res) => {
    const id = req.params.id;
    designationService.getApplicantsById(id, (err, results) => {
      if (err) {
        return res.status(404).json({ success: 0, message: err.message });
      }
      return res.status(200).json({ success: 1, data: results });
    });
  },

  getApplicantsByDepartment: (req, res) => {
    const id = req.params.id;
    designationService.getApplicantsByDepartment(id, (err, results) => {
      if (err) {
        return res.status(404).json({ success: 0, message: err.message });
      }
      return res.status(200).json({ success: 1, data: results });
    });
  },

  getApplicants: (req, res) => {
    designationService.getApplicants((err, results) => {
      if (err) {
        return res.status(500).json({ success: 0, message: err.message });
      }
      return res.status(200).json({ success: 1, data: results });
    });
  },

  updateApplicant: (req, res) => {
    const data = req.body;
    const id = req.params.id
    designationService.updateApplicant(id, data, (err, results) => {
      if (err) {
        return res.status(500).json({ success: 0, message: err.message });
      }
      return res.status(200).json({ success: 1, message: 'Updated successfully' });
    });
  },

  deleteApplicant: (req, res) => {
    const id = req.params.id;
    designationService.deleteApplicant(id, (err, results) => {
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
