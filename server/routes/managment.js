import express from "express";
import {getAdmins , getAllAffiliatePerformance} from "../controller/managment.js"

const router = express.Router();


router.get("/admins",getAdmins)
router.get("/performance/:id" , getAllAffiliatePerformance)


export default router