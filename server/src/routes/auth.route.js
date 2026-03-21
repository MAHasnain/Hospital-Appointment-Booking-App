import { Router } from "express";
import { login, logout, refreshAccessToken, registerDoctor, registerPatient } from "../controller/auth.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

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
// Secured routes
router
    .route("/refresh-token")
    .post(verifyJWT, refreshAccessToken)

router
    .route("/logout")
    .post(verifyJWT, logout)

export default router