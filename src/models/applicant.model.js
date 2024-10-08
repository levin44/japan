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
                //adding filesuploads
              personalPhoto: `${applicantResults[0].personalPhoto}`,
              cv: `${applicantResults[0].cv}`,
              interview: `${applicantResults[0].interview}`,
              ptTest: `${applicantResults[0].ptTest}`,
              ptTestCertificate: `${applicantResults[0].ptTestCertificate}`,
              passportCopy: `${applicantResults[0].passportCopy}`,
              driverLicense: `${applicantResults[0].driverLicense}`,
              qualificationEducation: `${applicantResults[0].qualificationEducation}`,
              qualificationWorking: `${applicantResults[0].qualificationWorking}`,

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
      // Base part of the query
  let updateApplicantQuery = `UPDATE applicant SET `;
  const applicantValues = [];

  // Add each field dynamically if it's not null
  if (data.fullName) {
    updateApplicantQuery += `full_name = ?, `;
    applicantValues.push(data.fullName);
  }

  if (data.fullNameJapan) {
    updateApplicantQuery += `full_name_jp = ?, `;
    applicantValues.push(data.fullNameJapan);
  }

  if (data.dateOfBirth) {
    updateApplicantQuery += `date_of_birth = ?, `;
    applicantValues.push(data.dateOfBirth);
  }

  if (data.address) {
    updateApplicantQuery += `address = ?, `;
    applicantValues.push(data.address);
  }

  if (data.addressJapan) {
    updateApplicantQuery += `address_jp = ?, `;
    applicantValues.push(data.addressJapan);
  }

  if (data.statusOfResidence) {
    updateApplicantQuery += `status_of_residence = ?, `;
    applicantValues.push(data.statusOfResidence);
  }

  if (data.statusOfResidenceJapan) {
    updateApplicantQuery += `status_of_residence_jp = ?, `;
    applicantValues.push(data.statusOfResidenceJapan);
  }

  if (data.sex) {
    updateApplicantQuery += `sex = ?, `;
    applicantValues.push(data.sex);
  }

  if (data.nationality) {
    updateApplicantQuery += `nationality = ?, `;
    applicantValues.push(data.nationality);
  }

  if (data.nationalityJapan) {
    updateApplicantQuery += `nationality_jp = ?, `;
    applicantValues.push(data.nationalityJapan);
  }

  if (data.mobile) {
    updateApplicantQuery += `mobile = ?, `;
    applicantValues.push(data.mobile);
  }

  if (data.email) {
    updateApplicantQuery += `email = ?, `;
    applicantValues.push(data.email);
  }

  if (data.maritalStatus) {
    updateApplicantQuery += `marital_status = ?, `;
    applicantValues.push(data.maritalStatus);
  }

  if (data.children) {
    updateApplicantQuery += `children = ?, `;
    applicantValues.push(data.children);
  }

  if (data.bloodType) {
    updateApplicantQuery += `blood_type = ?, `;
    applicantValues.push(data.bloodType);
  }

  if (data.comfortableHand) {
    updateApplicantQuery += `comfortable_hand = ?, `;
    applicantValues.push(data.comfortableHand);
  }

  if (data.height) {
    updateApplicantQuery += `height = ?, `;
    applicantValues.push(data.height);
  }

  if (data.weight) {
    updateApplicantQuery += `weight = ?, `;
    applicantValues.push(data.weight);
  }

  if (data.smoke) {
    updateApplicantQuery += `smoke = ?, `;
    applicantValues.push(data.smoke);
  }

  if (data.alcohol) {
    updateApplicantQuery += `alcohol = ?, `;
    applicantValues.push(data.alcohol);
  }

  if (data.tattoo) {
    updateApplicantQuery += `tattoo = ?, `;
    applicantValues.push(data.tattoo);
  }

  if (data.colorBlindness) {
    updateApplicantQuery += `color_blindness = ?, `;
    applicantValues.push(data.colorBlindness);
  }

  if (data.beenToJapan) {
    updateApplicantQuery += `been_to_japan = ?, `;
    applicantValues.push(data.beenToJapan);
  }

    // Fields you want to conditionally update
    if (data.personalPhoto !== null) {
      updateApplicantQuery += `personalPhoto = ?, `;
      applicantValues.push(data.personalPhoto);
    }
  
    if (data.cv !== null) {
      updateApplicantQuery += `cv = ?, `;
      applicantValues.push(data.cv);
    }
  
    if (data.interview !== null) {
      updateApplicantQuery += `interview = ?, `;
      applicantValues.push(data.interview);
    }
  
    if (data.ptTest !== null) {
      updateApplicantQuery += `ptTest = ?, `;
      applicantValues.push(data.ptTest);
    }
  
    if (data.ptTestCertificate !== null) {
      updateApplicantQuery += `ptTestCertificate = ?, `;
      applicantValues.push(data.ptTestCertificate);
    }
  
    if (data.passportCopy !== null) {
      updateApplicantQuery += `passportCopy = ?, `;
      applicantValues.push(data.passportCopy);
    }
  
    if (data.driverLicense !== null) {
      updateApplicantQuery += `driverLicense = ?, `;
      applicantValues.push(data.driverLicense);
    }
  
    if (data.qualificationEducation !== null) {
      updateApplicantQuery += `qualificationEducation = ?, `;
      applicantValues.push(data.qualificationEducation);
    }
  
    if (data.qualificationWorking !== null) {
      updateApplicantQuery += `qualificationWorking = ?, `;
      applicantValues.push(data.qualificationWorking);
    }
  
    // Remove trailing comma and add WHERE clause
    updateApplicantQuery = updateApplicantQuery.slice(0, -2); // Remove the last comma
    updateApplicantQuery += ` WHERE id = ?`;
    applicantValues.push(id);
    
    // const updateApplicantQuery = `
    //   UPDATE applicant SET
    //     full_name = ?, 
    //     full_name_jp = ?, 
    //     date_of_birth = ?, 
    //     address = ?, 
    //     address_jp = ?, 
    //     status_of_residence = ?, 
    //     status_of_residence_jp = ?, 
    //     sex = ?, 
    //     nationality = ?, 
    //     nationality_jp = ?, 
    //     mobile = ?, 
    //     email = ?, 
    //     marital_status = ?, 
    //     children = ?, 
    //     blood_type = ?, 
    //     comfortable_hand = ?, 
    //     height = ?, 
    //     weight = ?, 
    //     smoke = ?, 
    //     alcohol = ?, 
    //     tattoo = ?, 
    //     color_blindness = ?, 
    //     been_to_japan = ?,
    //     personalPhoto = ?, 
    //     cv  = ?, 
    //     interview = ?, 
    //     ptTest = ?, 
    //     ptTestCertificate = ?, 
    //     passportCopy = ?, 
    //     driverLicense = ?, 
    //     qualificationEducation = ?, 
    //     qualificationWorking = ?
    //   WHERE id = ?`;

    // const applicantValues = [
    //   data.fullName,
    //   data.fullNameJapan,
    //   data.dateOfBirth,
    //   data.address,
    //   data.addressJapan,
    //   data.statusOfResidence,
    //   data.statusOfResidenceJapan,
    //   data.sex,
    //   data.nationality,
    //   data.nationalityJapan,
    //   data.mobile,
    //   data.email,
    //   data.maritalStatus,
    //   data.children,
    //   data.bloodType,
    //   data.comfortableHand,
    //   data.height,
    //   data.weight,
    //   data.smoke,
    //   data.alcohol,
    //   data.tattoo,
    //   data.colorBlindness,
    //   data.beenToJapan,
    //   data.personalPhoto,
    //   data.cv,
    //   data.interview,
    //   data.ptTest,
    //   data.ptTestCertificate,
    //   data.passportCopy,
    //   data.driverLicense,
    //   data.qualificationEducation,
    //   data.qualificationWorking,
    //   id
    // ];

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
