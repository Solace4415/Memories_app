import express from "express";

const router = express.Router();

import { signin, signup } from "../controller/users.js";

router.route("/signin").post(signin);
router.route("/signup").post(signup);

export default router;
