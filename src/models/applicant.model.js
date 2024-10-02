const sql = require('../config/database');

module.exports = {
  createApplicant: (data, callBack) => {
    sql.query(
      `INSERT INTO applicant (
        full_name, 
        full_name_jp, 
        date_of_birth, 
        address, 
        address_jp, 
        status_of_residence, 
        status_of_residence_jp, 
        sex, 
        nationality, 
        nationality_jp, 
        mobile, 
        email, 
        marital_status, 
        children, 
        blood_type, 
        comfortable_hand, 
        height, 
        weight, 
        smoke, 
        alcohol, 
        tattoo, 
        color_blindness, 
        been_to_japan
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.fullName,
        data.fullNameJapan,
        data.dateOfBirth,
        data.address,
        data.addressJapan,
        data.statusOfResidence,
        data.statusOfResidenceJapan,
        data.sex,
        data.nationality,
        data.nationalityJapan,
        data.mobile,
        data.email,
        data.maritalStatus,
        data.children,
        data.bloodType,
        data.comfortableHand,
        data.height,
        data.weight,
        data.smoke,
        data.alcohol,
        data.tattoo,
        data.colorBlindness,
        data.beenToJapan
      ],
      (error, results) => {
        if (error) {
          return callBack(error);
        }

        const applicantId = results.insertId; // Get the ID of the inserted applicant

        // Insert Education Records
        const educationValues = data.education.map((item) => [
          applicantId, item.year, item.month, item.background, item.yearJapan, item.monthJapan, item.backgroundJapan
        ]);
        const educationQuery = `
          INSERT INTO educationData (
            applicant_id, year, month, background, year_japan, month_japan, background_japan
          ) VALUES ?`;

        sql.query(educationQuery, [educationValues], (educationError, educationResults) => {
          if (educationError) {
            return callBack(educationError);
          }

          // Insert Work History Records
          const workHistoryValues = data.workHistory.map((item) => [
            applicantId, item.year, item.month, item.companyName, item.occupation, item.location,
            item.yearJapan, item.monthJapan, item.companyNameJapan, item.occupationJapan, item.locationJapan
          ]);
          const workHistoryQuery = `
            INSERT INTO workHistoryData (
              applicant_id, year, month, company_name, occupation, location, 
              year_japan, month_japan, company_name_japan, occupation_japan, location_japan
            ) VALUES ?`;

          sql.query(workHistoryQuery, [workHistoryValues], (workHistoryError, workHistoryResults) => {
            if (workHistoryError) {
              return callBack(workHistoryError);
            }

            // Insert Qualification Records
            const qualificationValues = data.qualifications.map((item) => [
              applicantId, item.year, item.month, item.qualification, item.yearJapan, item.monthJapan, item.qualificationJapan
            ]);
            const qualificationQuery = `
              INSERT INTO qualificationData (
                applicant_id, year, month, qualification, year_japan, month_japan, qualification_japan
              ) VALUES ?`;

            sql.query(qualificationQuery, [qualificationValues], (qualificationError, qualificationResults) => {
              if (qualificationError) {
                return callBack(qualificationError);
              }

              return callBack(null, {
                applicantResults: results,
                educationResults: educationResults,
                workHistoryResults: workHistoryResults,
                qualificationResults: qualificationResults
              });
            });
          });
        });
      }
    );
  },


  getApplicantsById: (id, callBack) => {
    sql.query(
      `SELECT * FROM applicant WHERE Desig_ID = ?`,
      [id],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getApplicantsByDepartment: (id, callBack) => {
    sql.query(
      `SELECT * FROM applicant WHERE Department_ID = ?`,
      [id],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getApplicants: callBack => {
    sql.query(
      `SELECT * FROM applicant`,
      [],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  updateApplicant: (id, data, callBack) => {
    sql.query(
      `UPDATE applicant SET Name = ?, Base_Salary = ?, Department_ID = ? WHERE Desig_ID = ?`,
      [data.name, data.baseSalary, data.departmentId, id],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  deleteApplicant: (id, callBack) => {
    sql.query(
      `DELETE FROM applicant WHERE Desig_ID = ?`,
      [id],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  }
};
