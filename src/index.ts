import Fastify, { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import {getAllProduct, getProduct, setProduct, deleteProduct, updateProduct} from './db'
import cors from '@fastify/cors';

const server = Fastify();
const PORT = Number(process.env.PORT || 3000);

const errorMessage ="Whoops! Error connecting to the database–please try again!";

interface CreateProductRoute extends RouteGenericInterface {
  Body: {
    title: string;
    description: string;
    value: number;
    category: string;
  };
}

interface DeleteProductRoute extends RouteGenericInterface {
  Body: {
    id: number
  };
}

interface UpadteProductRoute extends RouteGenericInterface {
  Body: {
    title: string;
    description: string;
    value: number;
    category: string;
    id: number
  };
}

server.register(cors,{
  origin: '*',
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
})

server.get("/", (request, reply) => {
  const data = {
    title: "Hello SQLite (blank)",
    intro: "This is a database-backed API with the following endpoints",
  };
  reply.status(200).send(data);
});

server.get("/getAllProduct", async (request, reply) => {
  let data: {chat: any[] | undefined, error: string | undefined} = { chat: await getAllProduct(), error: undefined};
  if(!data.chat) data.error = errorMessage;
  const status = data.error ? 400 : 200;
  reply.status(status).send(data);
});

server.post("/getProduct", async (
  request: FastifyRequest<UpadteProductRoute>,
  reply: FastifyReply
) => {
  const { id } = request.body;
  let data: {chat: any[] | undefined, error: string | undefined, status: boolean} = {chat: undefined,error: undefined, status: false}
  if(id) data.chat = await getProduct(id)
  if(!data.chat) data.error = errorMessage;
  if(data.chat) data.status = true;
  const status = data.error ? 400 : 200;
  reply.status(status).send(data);
});

server.post("/Product", async (
    request: FastifyRequest<CreateProductRoute>,
    reply: FastifyReply
) => {
    const { title, description, value, category } = request.body;
    let data: {chat: any[] | undefined, error: string | undefined, status: boolean} = { chat: await setProduct({title, description, value, category}), error: undefined, status: false};
    if(!data.chat) data.error = errorMessage;
    if(data.chat) data.status = true;
    const status = data.error ? 400 : 200;
    reply.status(status).send(data);

})
server.delete("/Product", async (
    request: FastifyRequest<DeleteProductRoute>,
    reply: FastifyReply
) => {
    const { id } = request.body;
    let data: {chat: any[] | undefined, error: string | undefined, status: boolean} = {chat: undefined,error: undefined, status: false}
    if(id) data.chat = await deleteProduct(id)
    if(!data.chat) data.error = errorMessage;
    if(data.chat) data.status = true;
    const status = data.error ? 400 : 200;
    reply.status(status).send(data);
})
server.put("/Product", async (
    request: FastifyRequest<UpadteProductRoute>,
    reply: FastifyReply
) => {
    const { title, description, value, category, id } = request.body;
    let data: {chat: any[] | undefined, error: string | undefined, status: boolean} = {chat:undefined,error: undefined, status: false}
    if(id) data.chat = await updateProduct({title, description, value, category, id})
    if(data.chat) data.status = true;
    if(!data.chat) data.error = errorMessage;
    const status = data.error ? 400 : 200;
    reply.status(status).send(data);
})

server.listen({ port: PORT, host: "0.0.0.0" })
  .then(() => console.log(`🚀 Servidor rodando em ${PORT}`))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });