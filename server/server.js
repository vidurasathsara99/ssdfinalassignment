const Koa = require('koa');
const cors = require('@koa/cors');
const bodyparser = require('koa-bodyparser');
const formidable = require('koa2-formidable');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const jwt = require('koa-jwt');
const CSRF = require('koa-csrf');
const session = require('koa-generic-session');
const convert = require('koa-convert');
const redisStore = require('koa-redis');
//routers
const HomeRoutes = require('./routes/home.router.js').DefaultRouter;
const LoginRoutes = require('./routes/login.router.js').LoginRouter;
const ProfileRoutes = require('./routes/profile.router').ProfileRouter;
const AdminRoutes = require('./routes/admin.router').AdminRouter;
const UserServices = require('./routes/user-service.router').UserServices;
const ChartMethodsRouter = require('./routes/counter.router').ChartMethodsRouter;
const MessageRoutes = require('./routes/message.router').MessageRouter;
//setup server
const server = new Koa();
server.keys = ['keys','keykeys'];
server.use(session({
    store: redisStore()
}));
//attach to server
// server.use(cors('Access-Control-Allow-Origin'));
// server.use(jwt({
//     cookie: 'jwt_cookie',
//     key: 'jwtdata',
//     secret: [
//         'HeuteIstDerErsteTagVomRestDeinesLebens'
//     ]
// }).unless({path: [/^\/login/]}))
// server.use(new CSRF());
server.use(formidable({uploadDir:'./server/files/temp', keepExtensions:true}));
server.use(bodyparser())
    .use(HomeRoutes.routes()).use(HomeRoutes.allowedMethods())
    .use(LoginRoutes.routes()).use(LoginRoutes.allowedMethods())
    .use(ProfileRoutes.routes()).use(ProfileRoutes.allowedMethods())
    .use(AdminRoutes.routes()).use(AdminRoutes.allowedMethods())
    .use(UserServices.routes()).use(UserServices.allowedMethods())
    .use(ChartMethodsRouter.routes()).use(ChartMethodsRouter.allowedMethods())
    .use(MessageRoutes.routes()).use(MessageRoutes.allowedMethods())
    .use(context=>{
        //where the request is to an invalid endpoint
        context.body="Access Denied!";
        //context.redirect('http://localhost:1234/backendbrowser/index.html');
    });
server.listen(process.env.SERVER_LOCAL_PORT);
console.log("Development Application is running on port "+process.env.SERVER_LOCAL_PORT);

//config for https and https
let serverCallBack = server.callback();
let config ={
    domain:"abccompany.local",
    http:{ port: 3001,},
    https:{
        port: 3002,
        options: {
            key: fs.readFileSync((process.cwd(), 'cert/AbcCompany.key'),'utf8'),
            cert: fs.readFileSync((process.cwd(), 'cert/AbcCompany.crt'),'utf8'),
        },
    },
};
let httpServer = http.createServer(serverCallBack);
httpServer.listen(config.http.port, function (e){
    if(!!e)
        console.error('HTTP server FAILED: ', e, (e && e.stack));
    else
        console.log(`HTTP server is OK: http://${config.domain}:${config.http.port}`);
});
//http.createServer(app.callback()).listen(3000);
//for https
let httpsServer = https.createServer(config.https.options, serverCallBack);
httpsServer.listen(config.https.port, function (e){
    if(!!e)
        console.error('HTTPS server FAILED: ', e, (e && e.stack));
    else
        console.log(`HTTPS server is OK: https://${config.domain}:${config.https.port}`);
});