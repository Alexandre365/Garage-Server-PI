import Fastify, { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';
import {getAllProduct, getProduct, setProduct, deleteProduct, updateProduct} from './db'
import cors from '@fastify/cors';
import {F_reply_error, F_reply} from './utils'

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
    success:"Server is running",
    status: true,
  };
  reply.status(200).send(data);
});

server.get("/getAllProduct", async (request, reply) => {
  F_reply(await getAllProduct(), reply, undefined, 'request')
});

server.post("/getProduct", async (
  request: FastifyRequest<UpadteProductRoute>,
  reply: FastifyReply
) => {
  const { id } = request.body;

  if(!id || id == 0) F_reply_error(reply, 'ID')

  F_reply(await getProduct(id), reply, undefined, 'request')
});

server.post("/Product", async (
    request: FastifyRequest<CreateProductRoute>,
    reply: FastifyReply
) => {
  const { title, description, value, category } = request.body;

  if(!title || title.length < 5) F_reply_error(reply, 'title')
  if(!description || description.length < 5) F_reply_error(reply, 'description')
  if(!value || value == 0) F_reply_error(reply, 'value')
  if(!title || category.length < 5) F_reply_error(reply, 'category')

  F_reply(undefined, reply, await setProduct({title, description, value, category}), 'Registered')
})

server.delete("/Product", async (
    request: FastifyRequest<DeleteProductRoute>,
    reply: FastifyReply
) => {
    const { id } = request.body;

    if(!id || id == 0) F_reply_error(reply, 'ID')
    F_reply(undefined, reply, await deleteProduct(id), 'Delete')
})

server.put("/Product", async (
    request: FastifyRequest<UpadteProductRoute>,
    reply: FastifyReply
) => {
  const { title, description, value, category, id } = request.body;

  if(!title || title.length < 5) F_reply_error(reply, 'title')
  if(!description || description.length < 5) F_reply_error(reply, 'description')
  if(!value || value == 0) F_reply_error(reply, 'value')
  if(!title || category.length < 5) F_reply_error(reply, 'category')

  F_reply(undefined, reply, await updateProduct({title, description, value, category, id}), 'Update')
})

server.listen({ port: PORT, host: "0.0.0.0" })
  .then(() => console.log(`🚀 Servidor rodando em https://localhost:${PORT}`))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });