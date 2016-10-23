/* @flow */
"use strict";

import { Router } from "express";
import { create, join } from "../controllers/session";
import { requireAuth } from "../middlewares/authentication";

const router = Router();

router.post("/create", requireAuth,
            (req, resp) => resp.send(create(req.body.requester)));

router.post("/join", requireAuth,
            (req, resp) => resp.send(join(req.body.sessionID)));

export default router;
