const express = require("express")
const controller = require("../controllers/estabelecimentosController")

const router = express.Router()

router.get("/todos", controller.getAll)

router.get("/:id", controller.getById)

router.post("/criar", controller.criarEstabelecimento)

router.patch("/updatelike/:id", controller.updateLike)

router.patch("/updatedeslike/:id", controller.updateDeslike)

router.put("/atualizar/:id", controller.atualizarEstabelecimento)

router.delete("/deletar/:id", controller.deletarEstabelecimento)


router.post("/cadastro", controller.createId)

module.exports = router
