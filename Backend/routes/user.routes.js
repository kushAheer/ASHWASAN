import { Router } from "express";
import { createProfile } from "../controllers/user.controller";


const router = Router();

router.get('/profile',  createProfile);


export default router;




