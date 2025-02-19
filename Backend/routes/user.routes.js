const { Router } = require("express");
const { createProfile } = require("../controllers/user.controller");


const router = Router();

router.get('/profile',  createProfile);


module.exports = router;




