const express = require("express")
const controller = require("../controllers/estabelecimentoController")

const router = express.Router()

router.post("/cadastro", controller.createLocal)

router.get("/listar", controller.getAll)
router.get("/filtro", controller.getByFilter)
router.get("/:id", controller.getById)

router.patch("/like/:id", controller.updateLike)
router.patch("/deslike/:id", controller.updateDeslike)

router.put("/update/:id", controller.updateAnything)

router.delete("/delete/:id", controller.removeByiD)

module.exports = router