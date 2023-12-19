import express, { Router } from "express";
import getPass from "../controllers/PassControl.js";

const router:Router = express.Router();

router.get("/",getPass);

export default router