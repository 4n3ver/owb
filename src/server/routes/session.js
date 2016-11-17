/* @flow */
"use strict";

import { Router } from "express";
import { create, join, close } from "../controllers/session";
import { requireAuth } from "../middlewares/authentication";

const router = Router();

router.post("/create", requireAuth,
            (req, resp) => resp.send(create(req.body.requester)));

router.post("/join", requireAuth,
            (req, resp) => resp.send(join(req.body.sessionID)));

router.post("/close", requireAuth,
            (req, resp) => resp.send(close(req.body.requester)));

export default router;
