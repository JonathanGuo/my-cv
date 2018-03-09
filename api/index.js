import Router from 'koa-router';
import bodyparser from 'koa-bodyparser';
import Koa from 'koa';
import cors from '@koa/cors';
import sendMail from './sendMail';

// Create a new koa app.
const app = new Koa();

// Create a router
const router = new Router();

// Enable body parsing.
app.use(cors());
app.use(bodyparser());

app.use(sendMail.routes())
    .use(router.allowedMethods());

// Start koa server.
app.listen(3000);
