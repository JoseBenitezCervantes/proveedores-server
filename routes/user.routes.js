const { Router } = require("express");
const { middlewareResolve } = require("../controllers/usuarios.controller");

const router = Router();

router.get("/getUsers", middlewareResolve);

module.exports = router; 