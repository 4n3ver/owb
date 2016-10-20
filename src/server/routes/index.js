/* @flow */
"use strict";

import root from "./root";
import session from "./session";

export default app => {
    app.use("/", root);
    app.use("/session", session);
};
