import express from "express";
import { getUserById,getAdminDashboardStats } from "../controller/general.js";

const router = express.Router();

router.get("/user/:id", getUserById);
router.get("/admin-dashboard",getAdminDashboardStats)

export default router;
