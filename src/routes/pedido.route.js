const express = require("express")

const route = express.Router()

const {listarPedidos, cadastrarPedido, buscarPedidoPorId, atualizarPedido, deletarPedido} = require("../controllers/pedido.controller.js");

route.get("/listar", listarPedidos);
route.post("/cadastrar", cadastrarPedido)
route.get("/listar/:id",  buscarPedidoPorId)
route.put("/atualizar/:id", atualizarPedido)
route.delete("/deletar/:id", deletarPedido)

module.exports = route;