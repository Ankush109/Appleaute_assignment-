import express from "express";
import { productController } from "../controllers";
import { authMiddleware } from "../middlewares";
const router = express.Router();
router.post("/create-product", authMiddleware, productController.createProduct);
router.get("/get-products", authMiddleware, productController.getProducts);
router.post(
  "/create-category",

  productController.createCategory
);
export default router;
