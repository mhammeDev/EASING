const express = require("express");
const DaoController = require("../controllers/DaoController");

const router = express.Router();

router.get("/rooms", DaoController.getAllRooms)
router.get("/actions", DaoController.getAllActions)
router.get("/type_actuors", DaoController.getAllTypeActuors)
router.get("/type_captors", DaoController.getAllTypeCaptors)




module.exports = router;
