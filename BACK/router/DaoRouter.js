const express = require("express");
const DaoController = require("../controllers/DaoController");

const router = express.Router();

router.get("/rooms", DaoController.getAllRooms)
router.get("/actions", DaoController.getAllActions)
router.get("/type-actuators", DaoController.getAllTypeActuors)
router.get("/type-sensors", DaoController.getAllTypeCaptors)




module.exports = router;
