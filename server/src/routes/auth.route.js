import { Router } from "express";
import { login, register } from "../controller/auth.controller.js";

const router = Router();

router
    .route("/register")
    .post(register)

router
    .route("/login")
    .post(login)

router
    .route("/refresh-token")
    .post(refreshAccessToken)

router
    .route("/logout")
    .post(logoutUser)

export default router