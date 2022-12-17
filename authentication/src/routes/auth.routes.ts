import { Router } from "express";
const router = Router();

import * as authCtrl from "../controllers/auth.controller";
import { verifySignup, authJwt } from "../middlewares/index";

router.post("/signup", [verifySignup.checkDuplicatedUsernameOrEmail, verifySignup.checkRolesExisted], authCtrl.signup);
router.post("/signin", authCtrl.signin);
router.post("/logout", authCtrl.logout);
router.post("/verifytoken", authJwt.verifyToken);

export default router;
