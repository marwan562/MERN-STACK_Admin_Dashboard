import express from "express";
import {getOverView} from "../controller/sales.js"

const router = express.Router();

router.get("/",getOverView)

export default router