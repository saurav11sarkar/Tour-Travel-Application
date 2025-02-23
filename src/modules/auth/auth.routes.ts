import express from "express";
import { authController } from "./auth.controller";
import requestValidation from "../../middlewares/requestValidation";
import { authValidation } from "./auth.validation";
const router = express.Router();

router.post("/register", authController.register);
router.post("/login",requestValidation(authValidation.authSchema),authController.login);
router.post("/forget-password",requestValidation(authValidation.forgetPassword),authController.forgetPassword);
router.post("/reset-password",authController.resetPassword);

export const authRouter = router;
