const express = require("express")
const controller = require("../controllers/estabelecimentoController")

const router = express.Router()

router.get("/todos", controller.getAll)

router.get("/:id", controller.getById)

router.post("/criar", controller.criarEstabelecimento)

router.patch("/updatelike/:id", controller.updateLike)

router.patch("/updatedeslike/:id", controller.updateDeslike)

router.put("/atualizar/:id", controller.atualizarEstabelecimento)

router.delete("/deletar/:id", controller.deletarEstabelecimento)

module.exports = router
