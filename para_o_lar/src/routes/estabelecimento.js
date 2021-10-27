const controller = require("../controllers/estabelecimentoController");
const express = require("express");
const router = express.Router();

router.get("/todos", controller.getAll);
router.get("/:id", controller.getById);
router.post("/create", controller.create);
router.patch("/likes/:id", controller.like)
router.patch("/deslikes/:id", controller.deslike)
router.delete("/remover/:id", controller.remover)
router.put("/atualizar/:id", controller.atualizar)
module.exports = router;
