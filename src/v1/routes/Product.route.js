import express from "express";
import { productController } from "../controllers";
import { authMiddleware } from "../middlewares";
import orderController from "../controllers/order/order.controller";
const router = express.Router();
router.post("/create-product", authMiddleware, productController.createProduct);
router.get("/get-products", productController.getProducts);
router.post(
  "/create-category",

  productController.createCategory
);
router.post("/createOrder", authMiddleware, orderController.createOrder);
export default router;
