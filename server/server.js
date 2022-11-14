const Koa = require('koa');
const cors = require('@koa/cors');
const bodyparser = require('koa-bodyparser');
const formidable = require('koa2-formidable');
require('dotenv').config();
//routers
const HomeRoutes = require('./routes/home.router.js').DefaultRouter;
const LoginRoutes = require('./routes/login.router.js').LoginRouter;
const ProfileRoutes = require('./routes/profile.router').ProfileRouter;
const AdminRoutes = require('./routes/admin.router').AdminRouter;
const UserServices = require('./routes/user-service.router').UserServices;
const ChartMethodsRouter = require('./routes/counter.router').ChartMethodsRouter;
//setup server
const server = new Koa();
//attach to server
server.use(cors('Access-Control-Allow-Origin'));
server.use(formidable({uploadDir:'./server/files/temp', keepExtensions:true}));
server.use(bodyparser())
    .use(HomeRoutes.routes()).use(HomeRoutes.allowedMethods())
    .use(LoginRoutes.routes()).use(LoginRoutes.allowedMethods())
    .use(ProfileRoutes.routes()).use(ProfileRoutes.allowedMethods())
    .use(AdminRoutes.routes()).use(AdminRoutes.allowedMethods())
    .use(UserServices.routes()).use(UserServices.allowedMethods())
    .use(ChartMethodsRouter.routes()).use(ChartMethodsRouter.allowedMethods())
    .use(context=>{
        //where the request is to an invalid endpoint
        context.body="Access Denied!";
        //context.redirect('http://localhost:1234/backendbrowser/index.html');
    });
server.listen(process.env.SERVER_LOCAL_PORT);
console.log("Application is running on port "+process.env.SERVER_LOCAL_PORT);