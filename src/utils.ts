import { FastifyReply } from "fastify";

let data: {data: any[] | undefined, error: string | undefined, status: boolean}
let success_or_error: {data: any[] | undefined, error: string | undefined, success: string | undefined, status: boolean}

let F_reply_error = (reply: FastifyReply, name: string) =>{
    data = {
      data: [],
      error: `The ${name} value is null or too small`,
      status: false
    }
    const status = data.error ? 400 : 200;
    reply.status(status).send(data);
}

let F_reply = (data: any[] | undefined,reply: FastifyReply, item: number | undefined, name: string) =>{
    if(item || Number(item) > 0){
        success_or_error = {
            data: data,
            error: undefined,
            success: `${name} successfully`,
            status: true
        }
        const status = success_or_error.error ? 400 : 200;
        reply.status(status).send(success_or_error);
    }if (data) {
        success_or_error = {
            data: data,
            error: undefined,
            success: `${name} successfully`,
            status: true
        }
        const status = success_or_error.error ? 400 : 200;
        reply.status(status).send(success_or_error);
    }else{
        success_or_error = {
            data: undefined,
            error: `It was not ${name} in the database`,
            success: undefined,
            status: false
        }
        const status = success_or_error.error ? 400 : 200;
        reply.status(status).send(success_or_error);
    }
}

export {F_reply_error, F_reply}