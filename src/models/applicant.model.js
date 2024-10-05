const sql = require('../config/database');

module.exports = {
  createApplicant: (applicantData, callBack) => {
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
        been_to_japan,
        personalPhoto, 
        cv, 
        interview, 
        ptTest, 
        ptTestCertificate, 
        passportCopy, 
        driverLicense, 
        qualificationEducation, 
        qualificationWorking
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        applicantData.fullName,
        applicantData.fullNameJapan,
        applicantData.dateOfBirth,
        applicantData.address,
        applicantData.addressJapan,
        applicantData.statusOfResidence,
        applicantData.statusOfResidenceJapan,
        applicantData.sex,
        applicantData.nationality,
        applicantData.nationalityJapan,
        applicantData.mobile,
        applicantData.email,
        applicantData.maritalStatus,
        applicantData.children,
        applicantData.bloodType,
        applicantData.comfortableHand,
        applicantData.height,
        applicantData.weight,
        applicantData.smoke,
        applicantData.alcohol,
        applicantData.tattoo,
        applicantData.colorBlindness,
        applicantData.beenToJapan,
        applicantData.personalPhoto, 
        applicantData.cv, 
        applicantData.interview, 
        applicantData.ptTest, 
        applicantData.ptTestCertificate, 
        applicantData.passportCopy, 
        applicantData.driverLicense, 
        applicantData.qualificationEducation, 
        applicantData.qualificationWorking
      ],
      (error, results) => {
        if (error) {
          return callBack(error);
        }

        const applicantId = results.insertId; // Get the ID of the inserted applicant

        // Insert Education Records
        const educationValues = applicantData.education.map((item) => [
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
          const workHistoryValues = applicantData.workHistory.map((item) => [
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
            const qualificationValues = applicantData.qualifications.map((item) => [
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
      `SELECT id,full_name, date_of_birth, sex, marital_status, been_to_japan FROM applicant`,
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
          maritalStatus: `${item.marital_status}`,
          beenToJapan: `${item.been_to_japan}`,
        }))

        return callBack(null, mappedNames);
      }
    );
  },

  updateApplicant: (id, data, callBack) => {
    const updateApplicantQuery = `
      UPDATE applicant SET
        full_name = ?, 
        full_name_jp = ?, 
        date_of_birth = ?, 
        address = ?, 
        address_jp = ?, 
        status_of_residence = ?, 
        status_of_residence_jp = ?, 
        sex = ?, 
        nationality = ?, 
        nationality_jp = ?, 
        mobile = ?, 
        email = ?, 
        marital_status = ?, 
        children = ?, 
        blood_type = ?, 
        comfortable_hand = ?, 
        height = ?, 
        weight = ?, 
        smoke = ?, 
        alcohol = ?, 
        tattoo = ?, 
        color_blindness = ?, 
        been_to_japan = ?
      WHERE id = ?`;
  
    const applicantValues = [
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
      data.beenToJapan,
      id
    ];
  
    sql.query(updateApplicantQuery, applicantValues, (error, applicantResults) => {
      if (error) {
        return callBack(error);
      }
  
      // Update Education Records
      const deleteEducationQuery = `DELETE FROM educationData WHERE applicant_id = ?`;
      sql.query(deleteEducationQuery, [id], (deleteEducationError) => {
        if (deleteEducationError) {
          return callBack(deleteEducationError);
        }
  
        const educationValues = data.education.map(item => [
          id, item.year, item.month, item.background, item.yearJapan, item.monthJapan, item.backgroundJapan
        ]);
  
        const insertEducationQuery = `
          INSERT INTO educationData (applicant_id, year, month, background, year_japan, month_japan, background_japan)
          VALUES ?`;
        sql.query(insertEducationQuery, [educationValues], (insertEducationError) => {
          if (insertEducationError) {
            return callBack(insertEducationError);
          }
  
          // Update Work History Records
          const deleteWorkHistoryQuery = `DELETE FROM workHistoryData WHERE applicant_id = ?`;
          sql.query(deleteWorkHistoryQuery, [id], (deleteWorkHistoryError) => {
            if (deleteWorkHistoryError) {
              return callBack(deleteWorkHistoryError);
            }
  
            const workHistoryValues = data.workHistory.map(item => [
              id, item.year, item.month, item.companyName, item.occupation, item.location,
              item.yearJapan, item.monthJapan, item.companyNameJapan, item.occupationJapan, item.locationJapan
            ]);
  
            const insertWorkHistoryQuery = `
              INSERT INTO workHistoryData (applicant_id, year, month, company_name, occupation, location, year_japan, month_japan, company_name_japan, occupation_japan, location_japan)
              VALUES ?`;
  
            sql.query(insertWorkHistoryQuery, [workHistoryValues], (insertWorkHistoryError) => {
              if (insertWorkHistoryError) {
                return callBack(insertWorkHistoryError);
              }
  
              // Update Qualification Records
              const deleteQualificationQuery = `DELETE FROM qualificationData WHERE applicant_id = ?`;
              sql.query(deleteQualificationQuery, [id], (deleteQualificationError) => {
                if (deleteQualificationError) {
                  return callBack(deleteQualificationError);
                }
  
                const qualificationValues = data.qualifications.map(item => [
                  id, item.year, item.month, item.qualification, item.yearJapan, item.monthJapan, item.qualificationJapan
                ]);
  
                const insertQualificationQuery = `
                  INSERT INTO qualificationData (applicant_id, year, month, qualification, year_japan, month_japan, qualification_japan)
                  VALUES ?`;
  
                sql.query(insertQualificationQuery, [qualificationValues], (insertQualificationError) => {
                  if (insertQualificationError) {
                    return callBack(insertQualificationError);
                  }
  
                  return callBack(null, {
                    message: "Applicant and related records updated successfully"
                  });
                });
              });
            });
          });
        });
      });
    });
  },
  

  deleteApplicant: (id, callBack) => {
    // Delete associated qualification records
    const deleteQualificationQuery = `DELETE FROM qualificationData WHERE applicant_id = ?`;
    sql.query(deleteQualificationQuery, [id], (qualificationError) => {
      if (qualificationError) {
        return callBack(qualificationError);
      }
  
      // Delete associated work history records
      const deleteWorkHistoryQuery = `DELETE FROM workHistoryData WHERE applicant_id = ?`;
      sql.query(deleteWorkHistoryQuery, [id], (workHistoryError) => {
        if (workHistoryError) {
          return callBack(workHistoryError);
        }
  
        // Delete associated education records
        const deleteEducationQuery = `DELETE FROM educationData WHERE applicant_id = ?`;
        sql.query(deleteEducationQuery, [id], (educationError) => {
          if (educationError) {
            return callBack(educationError);
          }
  
          // Finally, delete the applicant
          const deleteApplicantQuery = `DELETE FROM applicant WHERE id = ?`;
          sql.query(deleteApplicantQuery, [id], (applicantError, applicantResults) => {
            if (applicantError) {
              return callBack(applicantError);
            }
  
            return callBack(null, {
              message: "Applicant and all related records deleted successfully"
            });
          });
        });
      });
    });
  },
  
};
