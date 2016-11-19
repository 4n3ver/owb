/* @flow */
"use strict";

import { Router } from "express";
import authentication from "../controllers/authentication";
import watson from "../controllers/watson";
import {
    requireAuth,
    requireCorrectInfo
} from "../middlewares/authentication";

const router = Router();

router.get("/", requireAuth, (req, resp) =>
    resp.send({message: "hellow mellow"}));

router.post("/signin", requireCorrectInfo, (req, resp, next) =>
    watson.getToken((err, watsonToken) => {
        if (err) {
            if (err.httpStatus) {
                resp.status(err.httpStatus)
                    .send({error: err.message});
            }
            next(err);
        } else {
            resp.json(Object.assign(
                authentication.signin(req.user), watsonToken));
        }
    })
);

router.post("/signup", (req, resp, next) => {
    authentication.signup(
        req.body.email,
        req.body.password,
        (err, token) => {
            if (err) {
                if (err.httpStatus) {
                    resp.status(err.httpStatus).send({error: err.message});
                }
                next(err);
            } else {
                watson.getToken((err, watsonToken) => {
                    if (err) {
                        if (err.httpStatus) {
                            resp.status(err.httpStatus)
                                .send({error: err.message});
                        }
                        next(err);
                    } else {
                        resp.json(Object.assign(token, watsonToken));
                    }
                });
            }
        }
    );
});

export default router;
