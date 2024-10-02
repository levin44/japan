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
    // Query to get applicant details
    const applicantQuery = `SELECT * FROM applicant WHERE id = ?`;
  
    sql.query(applicantQuery, [id], (error, applicantResults) => {
      if (error) {
        return callBack(error);
      }
      if (applicantResults.length === 0) {
        return callBack(null, { message: "Applicant not found" });
      }
  
      // Query to get education details
      const educationQuery = `SELECT * FROM educationData WHERE applicant_id = ?`;
      sql.query(educationQuery, [id], (educationError, educationResults) => {
        if (educationError) {
          return callBack(educationError);
        }
  
        // Query to get work history details
        const workHistoryQuery = `SELECT * FROM workHistoryData WHERE applicant_id = ?`;
        sql.query(workHistoryQuery, [id], (workHistoryError, workHistoryResults) => {
          if (workHistoryError) {
            return callBack(workHistoryError);
          }
  
          // Query to get qualification details
          const qualificationQuery = `SELECT * FROM qualificationData WHERE applicant_id = ?`;
          sql.query(qualificationQuery, [id], (qualificationError, qualificationResults) => {
            if (qualificationError) {
              return callBack(qualificationError);
            }
  
             // Combine all results and map the data
          const mappedApplicant = {
            id: `${applicantResults[0].id}`,
            fullName: `${applicantResults[0].full_name}`,
            fullNameJapan: `${applicantResults[0].full_name_jp}`,
            dateOfBirth: `${applicantResults[0].date_of_birth}`,
            address: `${applicantResults[0].address}`,
            addressJapan: `${applicantResults[0].address_jp}`,
            statusOfResidence: `${applicantResults[0].status_of_residence}`,
            statusOfResidenceJapan: `${applicantResults[0].status_of_residence_jp}`,
            sex: `${applicantResults[0].sex}`,
            nationality: `${applicantResults[0].nationality}`,
            nationalityJapan: `${applicantResults[0].nationality_jp}`,
            mobile: `${applicantResults[0].mobile}`,
            email: `${applicantResults[0].email}`,
            maritalStatus: `${applicantResults[0].marital_status}`,
            children: `${applicantResults[0].children}`,
            bloodType: `${applicantResults[0].blood_type}`,
            comfortableHand: `${applicantResults[0].comfortable_hand}`,
            height: `${applicantResults[0].height}`,
            weight: `${applicantResults[0].weight}`,
            smoke: `${applicantResults[0].smoke}`,
            alcohol: `${applicantResults[0].alcohol}`,
            tattoo: `${applicantResults[0].tattoo}`,
            colorBlindness: `${applicantResults[0].color_blindness}`,
            beenToJapan: `${applicantResults[0].been_to_japan}`,
            // Adding education, workHistory, and qualifications as arrays of objects
            education: educationResults.map(item => ({
              year: item.year,
              month: item.month,
              background: item.background,
              yearJapan: item.year_japan,
              monthJapan: item.month_japan,
              backgroundJapan: item.background_japan
            })),
            workHistory: workHistoryResults.map(item => ({
              year: item.year,
              month: item.month,
              companyName: item.company_name,
              occupation: item.occupation,
              location: item.location,
              yearJapan: item.year_japan,
              monthJapan: item.month_japan,
              companyNameJapan: item.company_name_japan,
              occupationJapan: item.occupation_japan,
              locationJapan: item.location_japan
            })),
            qualifications: qualificationResults.map(item => ({
              year: item.year,
              month: item.month,
              qualification: item.qualification,
              yearJapan: item.year_japan,
              monthJapan: item.month_japan,
              qualificationJapan: item.qualification_japan
            }))
          };
// console.log("mappedApplicant", mappedApplicant);

            // Combine all results and return
            return callBack(null, mappedApplicant);
          });
        });
      });
    });
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
      `SELECT id,full_name, date_of_birth, sex FROM applicant`,
      [],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        const mappedNames = results.map((item) => ({
          id: `${item.id}`,
          fullName: `${item.full_name}`,
          dateOfBirth: `${item.date_of_birth}`,
          sex: `${item.sex}`,
        }))

        return callBack(null, mappedNames);
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
