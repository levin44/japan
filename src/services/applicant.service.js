const designationModel = require('../models/applicant.model');

module.exports = {
  createApplicant: (data, callBack) => {

    designationModel.createApplicant(data, (err, results) => {
      if (err) {
        return callBack(err);
      }
      return callBack(null, results);
    });
  },

  getApplicantsById: (id, callBack) => {
    designationModel.getApplicantsById(id, (err, results) => {
      if (err) {
        return callBack(err);
      }
      if (!results.length) {
        return callBack(new Error('Record not found'));
      }
      return callBack(null, results[0]);
    });
  },

  getApplicantsByDepartment: (id, callBack) => {
    designationModel.getApplicantsByDepartment(id, (err, results) => {
      if (err) {
        return callBack(err);
      }
      if (!results.length) {
        return callBack(new Error('Record not found'));
      }
      return callBack(null, results[0]);
    });
  },

  getApplicants: callBack => {
    designationModel.getApplicants((err, results) => {
      if (err) {
        return callBack(err);
      }
      return callBack(null, results);
    });
  },

  updateApplicant: (id, data, callBack) => {

    designationModel.updateApplicant(id, data, (err, results) => {
      if (err) {
        return callBack(err);
      }
      return callBack(null, results);
    });
  },

  deleteApplicant: (id, callBack) => {
    designationModel.deleteApplicant(id, (err, results) => {
      if (err) {
        return callBack(err);
      }
      return callBack(null, results);
    });
  },



};
