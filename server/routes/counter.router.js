const Router = require('@koa/router');
const {readDocumentWithQuery} = require("../api/db/mongodb.api");
const {readAllDocuments} = require("../api/db/mongodb.api");
const {countOfDocuments} = require("../api/db/mongodb.api");
const router = new Router({
    prefix:'/count'
});
const Paper = require("../api/paper.api").Paper;
const Login = require("../api/login.api").Login;

router.get("/conference-papers", async ctx=>{
    ctx.response.set('content-type','application/json');
    await countOfDocuments(Paper.AUTHORCOLLECTION).then(
        function (res){
            //console.log(JSON.stringify(res));
            ctx.body = res;
        }
    )
    //ctx.body = "success";
});
router.get("/workshops", async ctx=>{
    ctx.response.set('content-type','application/json');
    await countOfDocuments(Paper.WORKSHOPCOLLECTION).then(
        function (res){
            //console.log(JSON.stringify(res));
            ctx.body = res;
        }
    )
    //ctx.body = "success";
});
router.get("/user/:role", async ctx=>{
    const role = ctx.request.params.role;
    ctx.response.set('content-type','application/json');
    if(role==="all"){
        await countOfDocuments(Login.COLLECTION).then(
            function (res){
                ctx.body = res;
            }
        )
    }else {
        let query = {"role": role};
        await readDocumentWithQuery(Login.COLLECTION, query).then(
            function (res) {
                ctx.body = res.length;
            }
        )
    }
    //ctx.body = "success";
});
exports.ChartMethodsRouter = router;