import { Router } from "express";
import { login, logout, refreshAccessToken, register } from "../controller/auth.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router
    .route("/register")
    .post(upload.single("avatar"), register)

router
    .route("/login")
    .post(login)

router
    .route("/refresh-token")
    .post(refreshAccessToken)

router
    .route("/logout")
    .post(logout)

export default router