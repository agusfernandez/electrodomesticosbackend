const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './storage/imgs');
    },
    filename: function (req, file, cb) {
      const originalExtension = path.extname(file.originalname); 
      cb(null, `${file.fieldname}-${Date.now()}${originalExtension}`); // Genera un nombre único con la fecha
    }
});

const upload = multer({ storage });

module.exports = upload;
