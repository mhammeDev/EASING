const express = require("express");
const UserController = require("../controllers/UserController");
const userMiddleware = require("../middlewares/userMiddleware")

const router = express.Router();

router.post("/login", UserController.login)
router.get("/token", userMiddleware.verifyToken ,UserController.getInformationFromToken)


module.exports = router