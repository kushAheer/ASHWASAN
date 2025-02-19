const { Router } = require("express");
const { login, logout, register } = require("../controllers/auth.controller");

const router = Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);


module.exports = router;