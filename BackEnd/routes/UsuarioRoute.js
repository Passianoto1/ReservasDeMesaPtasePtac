const router = require("express").Router();

const UsuarioController = require("../controllers/UsuarioController");

router.post("/cadastro", UsuarioController.cadastrar);

router.post("/login", UsuarioController.login)

router.get("/home", UsuarioController.paginaHome);

router.get("/areaAdmin", UsuarioController.verificaAutenticacao, UsuarioController.verificaIsAdmin, UsuarioController.testeAdmin);

router.get("/perfil", UsuarioController.verificaAutenticacao, UsuarioController.verMeuPerfil)

router.patch("/perfil", UsuarioController.verificaAutenticacao, UsuarioController.atualizarMeuPerfil)

module.exports = router