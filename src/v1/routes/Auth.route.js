import express from "express";
import { loginController, registerController } from "../controllers";
import userController from "../controllers/user/userController";
import { authMiddleware } from "../middlewares";

const router = express.Router();

router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.post("/logout", loginController.logout);
router.get("/user-details", authMiddleware, userController.getUser);
router.get("/get-users", authMiddleware, userController.getUsers);
export default router;
