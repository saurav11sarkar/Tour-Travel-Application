import express from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
const router = express.Router();

router.post("/create-user", userController.createUser);
router.get("/",auth(["admin","user"]), userController.getUser);
router.get("/:id", userController.singleUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deletedUser);

export const userRouter = router;
