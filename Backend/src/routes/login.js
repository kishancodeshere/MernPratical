const express = require("express");
const { userController } = require("../controller/login");
const upload = require("../utils/uploads");
const router = express.Router();

router.post("/login", userController.login);
router.get("/home", userController.dashboard);
router.post("/upload",upload.single("image"), userController.upload);

module.exports = router;
