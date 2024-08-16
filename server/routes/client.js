import express from "express";
import { getProducts ,getCustomers , getTransactions , getUsersCountries} from "../controller/client.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/map",getUsersCountries)

export default router;
