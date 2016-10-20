/* @flow */
"use strict";

import { Router } from "express";

import { create, join } from "../controllers/session";
import { requireAuth } from "../middlewares/authentication";

const router = Router();

router.get("/", (req, resp) => {
    resp.send(create());
});

router.post("/", (req, resp) => {
    resp.send(join(req.body.sessionID));
});

export default router;
