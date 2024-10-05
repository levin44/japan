const applicantModel = require('../models/applicant.model');


module.exports = {
  createApplicant: (formData,fileData, callBack) => {

 // Combine form and file data for database insertion
 const applicantData = {
  ...formData,
  ...fileData // This merges the file paths (personalPhoto, cv, etc.) into the formData object
};

applicantModel.createApplicant(applicantData, (err, results) => {
  if (err) {
    return callBack(err);
  }
  return callBack(null, results);
});

  },

  getApplicantsById: (id, callBack) => {
    applicantModel.getApplicantsById(id, (err, results) => {
      console.log("results nisal", results.length);
      
      if (err) {
        return callBack(err);
      }
      if (!results) {
        return callBack(new Error('Record not found'));
      }
      return callBack(null, results);
    });
  },

  getApplicantsByDepartment: (id, callBack) => {
    applicantModel.getApplicantsByDepartment(id, (err, results) => {
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
    applicantModel.getApplicants((err, results) => {
      if (err) {
        return callBack(err);
      }
      return callBack(null, results);
    });
  },

  updateApplicant: (id, data, callBack) => {

    applicantModel.updateApplicant(id, data, (err, results) => {
      if (err) {
        return callBack(err);
      }
      return callBack(null, results);
    });
  },

  deleteApplicant: (id, callBack) => {
    applicantModel.deleteApplicant(id, (err, results) => {
      if (err) {
        return callBack(err);
      }
      return callBack(null, results);
    });
  },



};
