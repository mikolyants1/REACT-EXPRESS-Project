import express, { Router } from "express";
import { getPass } from "../controllers/PassControl.js";
import { validUser,check } from "../miidlewares/valid.js";

const router:Router = express.Router();

router.post("/",validUser,check, getPass);

export default router