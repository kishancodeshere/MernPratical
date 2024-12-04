const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/assets/uploads"),
  filename: (req, file, callback) => {
    callback(null, Date.now() + "img" + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  if (file.size > 550 * 1024) {
    return cb(new Error("File size exceeds 550 KB"));
  }
  const allowedTypes = ["image/jpeg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Invalid file type. Only JPEG and PNG are allowed."));
  }
  cb(null, true);
};
const upload = multer({
  storage: storage,
  limits: { fileSize: 550 * 1024 },
  fileFilter: fileFilter,
});

module.exports = upload;
