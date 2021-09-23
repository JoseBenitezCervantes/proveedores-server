const { Router } = require("express");
const { middlewareResolve } = require("../controllers/usuarios.controller");

const router = Router();

router.use((req, res, next) => {
  middlewareResolve(req, res, next);
});

router.get("/getUsers");
router.post("/insertUsers");

module.exports = router;
