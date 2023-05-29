import express from "express";
const router = express.Router();

import authController from "../controllers/authController.js";
import checkIsUserAuthenticated from "../middlewares/authMiddleware.js";

router.post('/user/register', authController.userRegistration);
router.post('/user/login', authController.userLogin);

// Protected Routes
router.post('/change-password', checkIsUserAuthenticated, authController.changePassword);

export default router;