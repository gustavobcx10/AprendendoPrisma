const express = require("express");
const router = express.router();

const { listar, cadastrar } = require("../controller/usuario.controller.js");

router.get("/listar",listar);
router.post("/cadastrar",cadastrar);

mudule.exports = router;