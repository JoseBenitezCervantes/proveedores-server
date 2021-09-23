const { Router } = require("express");
const { middlewareResolve } = require("../controllers/usuarios.controller");

const router = Router();

router.use((req, res, next) => {
  middlewareResolve(req, res, next); //Middleware para resolver todos las peticiones
});

router.get("/getUsers");
router.post("/insertUsers");

module.exports = router;
