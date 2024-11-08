import express from "express";
const router = express.Router();

import * as controller from "../../controllers/client/user.controller";

router.post("/register", controller.register);

export const usersRoute = router;