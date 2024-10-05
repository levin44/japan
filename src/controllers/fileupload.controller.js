const fileuploadService = require('../services/fileupload.service');

module.exports = {
  createFileupload: (req, res) => {
    const data = req.body;
    fileuploadService.createFileupload(data, (err, results) => {
      if (err) {
        return res.status(500).json({ success: 0, message: err.message });
      }
      return res.status(200).json({ success: 1, data: results });
    });
  },

  getFileuploadsById: (req, res) => {
    const id = req.params.id;
    fileuploadService.getFileuploadsById(id, (err, results) => {
      if (err) {
        return res.status(404).json({ success: 0, message: err.message });
      }
      return res.status(200).json({ success: 1, data: results });
    });
  },

  // getFileuploadsByDepartment: (req, res) => {
  //   const id = req.params.id;
  //   fileuploadService.getFileuploadsByDepartment(id, (err, results) => {
  //     if (err) {
  //       return res.status(404).json({ success: 0, message: err.message });
  //     }
  //     return res.status(200).json({ success: 1, data: results });
  //   });
  // },

  // getFileuploads: (req, res) => {
  //   fileuploadService.getFileuploads((err, results) => {
  //     if (err) {
  //       return res.status(500).json({ success: 0, message: err.message });
  //     }
  //     return res.status(200).json({ success: 1, data: results });
  //   });
  // },

  // updateFileupload: (req, res) => {
  //   const data = req.body;
  //   const id = req.params.id
  //   fileuploadService.updateFileupload(id, data, (err, results) => {
  //     if (err) {
  //       return res.status(500).json({ success: 0, message: err.message });
  //     }
  //     return res.status(200).json({ success: 1, message: 'Updated successfully' });
  //   });
  // },

  // deleteFileupload: (req, res) => {
  //   const id = req.params.id;
  //   fileuploadService.deleteFileupload(id, (err, results) => {
  //     if (err) {
  //       return res.status(500).json({ success: 0, message: err.message });
  //     }
  //     return res.status(200).json({ success: 1, message: 'User deleted successfully' });
  //   });
  // },

  // login: (req, res) => {
  //   const data = req.body;
  //   userService.login(data, (err, results) => {
  //     if (err) {
  //       return res.status(401).json({ success: 0, message: err.message });
  //     }
  //     return res.status(200).json({ success: 1, Login: true, message: 'Login successfully', token: results.token });
  //   });
  // },



};
