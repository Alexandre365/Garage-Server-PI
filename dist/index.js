"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const db_1 = require("./db");
const cors_1 = __importDefault(require("@fastify/cors"));
const utils_1 = require("./utils");
const server = (0, fastify_1.default)();
const PORT = Number(process.env.PORT || 3000);
const errorMessage = "Whoops! Error connecting to the database–please try again!";
server.register(cors_1.default, {
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
});
server.get("/", (request, reply) => {
    const data = {
        success: "Server is running",
        status: true,
    };
    reply.status(200).send(data);
});
server.get("/getAllProduct", async (request, reply) => {
    (0, utils_1.F_reply)(await (0, db_1.getAllProduct)(), reply, undefined, 'request');
});
server.post("/getProduct", async (request, reply) => {
    const { id } = request.body;
    if (!id || id == 0)
        (0, utils_1.F_reply_error)(reply, 'ID');
    (0, utils_1.F_reply)(await (0, db_1.getProduct)(id), reply, undefined, 'request');
});
server.post("/Product", async (request, reply) => {
    const { title, description, value, category } = request.body;
    if (!title || title.length < 5)
        (0, utils_1.F_reply_error)(reply, 'title');
    if (!description || description.length < 5)
        (0, utils_1.F_reply_error)(reply, 'description');
    if (!value || value == 0)
        (0, utils_1.F_reply_error)(reply, 'value');
    if (!title || category.length < 5)
        (0, utils_1.F_reply_error)(reply, 'category');
    (0, utils_1.F_reply)(undefined, reply, await (0, db_1.setProduct)({ title, description, value, category }), 'Registered');
});
server.delete("/Product", async (request, reply) => {
    const { id } = request.body;
    if (!id || id == 0)
        (0, utils_1.F_reply_error)(reply, 'ID');
    (0, utils_1.F_reply)(undefined, reply, await (0, db_1.deleteProduct)(id), 'Delete');
});
server.put("/Product", async (request, reply) => {
    const { title, description, value, category, id } = request.body;
    if (!title || title.length < 5)
        (0, utils_1.F_reply_error)(reply, 'title');
    if (!description || description.length < 5)
        (0, utils_1.F_reply_error)(reply, 'description');
    if (!value || value == 0)
        (0, utils_1.F_reply_error)(reply, 'value');
    if (!title || category.length < 5)
        (0, utils_1.F_reply_error)(reply, 'category');
    (0, utils_1.F_reply)(undefined, reply, await (0, db_1.updateProduct)({ title, description, value, category, id }), 'Update');
});
server.listen({ port: PORT, host: "0.0.0.0" })
    .then(() => console.log(`🚀 Servidor rodando em https://localhost:${PORT}`))
    .catch((err) => {
    console.error(err);
    process.exit(1);
});
