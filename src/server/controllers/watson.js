/* @flow */
"use strict";
import { _extend as extend } from "util";
import watson from "watson-developer-cloud";
import vcapServices from "vcap_services";
import {
    BLUE_MIX_PASSWORD,
    BLUE_MIX_URL,
    BLUE_MIX_USERNAME
} from "../../config";

const sttConfig = extend(
    {
        version : "v1",
        url     : BLUE_MIX_URL,
        username: process.env.STT_USERNAME || BLUE_MIX_USERNAME,
        password: process.env.STT_PASSWORD || BLUE_MIX_PASSWORD
    },
    vcapServices.getCredentials("speech_to_text"));
const sttAuthService = watson.authorization(sttConfig);

export const getToken = callback => sttAuthService.getToken(
    {url: sttConfig.url},
    (err, token) => {
        if (err) {
            callback(
                Object.assign(new Error("Error retrieving token: ", err), {
                    httpStatus: 500
                })
            );
        } else {
            callback(null, {watsonToken: token});
        }
    }
);

export default {
    getToken
};

