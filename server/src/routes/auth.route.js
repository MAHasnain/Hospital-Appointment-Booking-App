import { Router } from "express";
import { login, logout, refreshAccessToken, registerDoctor, registerPatient } from "../controller/auth.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router
    .route("/register-patient")
    .post(upload.single("avatar"), registerPatient);

router
    .route("/register-doctor")
    .post(upload.single("avatar"), registerDoctor);

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