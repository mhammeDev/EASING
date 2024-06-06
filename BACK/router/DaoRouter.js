const express = require("express");
const DaoController = require("../controllers/DaoController");
const userMiddleware = require("../middlewares/userMiddleware")

const router = express.Router();

router.get("/rooms", userMiddleware.verifyToken,DaoController.getAllRooms)
router.get("/actions", userMiddleware.verifyToken,DaoController.getAllActions)
router.get("/type-actuators", userMiddleware.verifyToken,DaoController.getAllTypeActuors)
router.get("/type-sensors", userMiddleware.verifyToken,DaoController.getAllTypeCaptors)




module.exports = router;
