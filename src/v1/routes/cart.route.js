import express from "express";
import { cartController } from "../controllers";
import { authMiddleware } from "../middlewares";
const router = express.Router();
router.post("/add-cart", authMiddleware, cartController.addToCart);
router.get("/get-cart", authMiddleware, cartController.getUserCart);
router.delete("/delete-cart", authMiddleware, cartController.deleteFromCart);

export default router;
