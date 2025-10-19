"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.F_reply = exports.F_reply_error = void 0;
let data;
let success_or_error;
let F_reply_error = (reply, name) => {
    data = {
        data: [],
        error: `The ${name} value is null or too small`,
        status: false
    };
    const status = data.error ? 400 : 200;
    reply.status(status).send(data);
};
exports.F_reply_error = F_reply_error;
let F_reply = (data, reply, item, name) => {
    if (item || Number(item) > 0) {
        success_or_error = {
            data: data,
            error: undefined,
            success: `${name} successfully`,
            status: true
        };
        const status = success_or_error.error ? 400 : 200;
        reply.status(status).send(success_or_error);
    }
    if (data) {
        success_or_error = {
            data: data,
            error: undefined,
            success: `${name} successfully`,
            status: true
        };
        const status = success_or_error.error ? 400 : 200;
        reply.status(status).send(success_or_error);
    }
    else {
        success_or_error = {
            data: undefined,
            error: `It was not ${name} in the database`,
            success: undefined,
            status: false
        };
        const status = success_or_error.error ? 400 : 200;
        reply.status(status).send(success_or_error);
    }
};
exports.F_reply = F_reply;
