const Router = require('@koa/router');
//mongo
const mongo = require('mongodb');
const {updateDocument} = require("../api/db/mongodb.api");
const saveDocument = require('../api/db/mongodb.api').saveDocument;
const saveDocumentGetId = require('../api/db/mongodb.api').saveDocumentGetId;
const readDocument = require('../api/db/mongodb.api').readDocument;
const readAllDocuments = require('../api/db/mongodb.api').readAllDocuments;
const countOfDocuments = require("../api/db/mongodb.api").countOfDocuments;
const router = new Router({
    prefix:'/user'
});
const Paper = require("../api/paper.api").Paper;
router.get("/author/:id",async ctx=>{
    const userid = ctx.request.params.id;
    ctx.response.set('content-type','application/json');
    //console.log("id:"+userid);
    if(userid==="default"){
        await readAllDocuments(Paper.AUTHORCOLLECTION).then(
            function (res){
                //console.log(JSON.stringify(res));
                ctx.body = res;
            }
        )
    }else {
        //const id = new mongo.ObjectId(userid);
        await readDocument(Paper.AUTHORCOLLECTION, "userid", userid).then(
            function (res) {
                //returns all assoc with userid
                ctx.body = res;
            }
        );
    }
});
router.get("/workshop/:id", async ctx=>{
    const userid = ctx.request.params.id;
    ctx.response.set('content-type','application/json');
    if(userid==="default"){
        await readAllDocuments(Paper.WORKSHOPCOLLECTION).then(
            function (res){
                ctx.body = res;
            }
        );
    }else {
        //const id = new mongo.ObjectId(userid);
        await readDocument(Paper.WORKSHOPCOLLECTION, "userid", userid).then(
            function (res) {
                //returns all assoc with userid
                ctx.body = res;
            }
        );
    }
});
router.get("/attendee/:id",async ctx=>{
    const userid = ctx.request.params.id;
    ctx.response.set('content-type','application/json');
    await readDocument(Payment.COLLECTION,"userid",userid).then(
        function (res){
            ctx.body = res;
        }
    )
})
router.get("/count/:type", async ctx=>{
    const type = ctx.request.params.type;
    ctx.response.set('content-type','application/json');
    if(type==="author"){
        await countOfDocuments(Paper.AUTHORCOLLECTION).then(
            function (res){
                console.log(JSON.stringify(res));
            }
        )
    }
    ctx.body = "success";
});
//=================== ADD PAPERS BASED ON USERID ===================
router.put("/author/:id",async ctx=>{
    //fields {userid, paper_authors, paper_topic, file_base64}
    /*
    const userid = ctx.request.params.userid;
    const paper_topic = ctx.request.body.paper_topic;
    const paper_authors = ctx.request.body.paper_authors;
    const file_base64 = ctx.request.body.file_base64;
     */
    //console.log(JSON.stringify(ctx.request.body));
    //console.log("id:"+userid+" topic:"+paper_topic+" authors:"+paper_authors+ " file:"+file_base64);
    let paper = new Paper();
    paper.change(ctx.request.body.bodyData);
    saveDocument(Paper.AUTHORCOLLECTION,[paper.getSaveToDb()]);
    ctx.response.set('content-type','application/json');
    ctx.body = "success";
});
router.put("/workshop/:id",async ctx=>{
    /*
    const userid = ctx.request.params.userid;
    const paper_topic = ctx.request.body.paper_authors;
    const paper_authors = ctx.request.body.paper_authors;
    const file_base64 = ctx.request.body.file_base64;
     */
    //console.log(JSON.stringify(ctx.request.body));
    //console.log("id:"+userid+" topic:"+paper_topic+" authors:"+paper_authors+ " file:"+file_base64);
    let paper = new Paper();
    paper.change(ctx.request.body.bodyData);
    saveDocument(Paper.WORKSHOPCOLLECTION,[paper.getSaveToDb()]);
    ctx.response.set('content-type','application/json');
    ctx.body = "success";
});
//==================ADD REVIEWS BASED ON PAPER ID ============================
router.put("/review/author/:id", async ctx=>{
    const paper_id = ctx.request.params.id;
    const action = ctx.request.body.action;
    let conferencePaper = new Paper();
    const id = new mongo.ObjectId(paper_id);
    await readDocument(Paper.AUTHORCOLLECTION,"_id",id).then(
        function (res){
            conferencePaper = res[0];
        }
    )
    conferencePaper.status = action;
    await updateDocument(Paper.AUTHORCOLLECTION,"_id",id,conferencePaper);
    ctx.response.set('content-type','application/json');
    ctx.body = "success";
});
router.put("/review/workshop/:id", async ctx=>{
    const paper_id = ctx.request.params.id;
    const action = ctx.request.body.action;
    //console.log("paper_id:"+paper_id + " action:"+action);
    let workshopPaper = new Paper();
    const id = new mongo.ObjectId(paper_id);
    await readDocument(Paper.WORKSHOPCOLLECTION,"_id",id).then(
        function (res){
            //console.log(JSON.stringify(res[0].paper_topic));
            workshopPaper.change(res[0]);
        }
    )
    workshopPaper.status = action;
    //console.log(JSON.stringify(workshopPaper.paper_topic));
    await updateDocument(Paper.WORKSHOPCOLLECTION,"_id",id,workshopPaper);
    ctx.response.set('content-type','application/json');
    ctx.body = "success";
});
//============== NO PAYMENTS FOR WORKSHOPS ===================
router.put("/payment/author/:id",async ctx=>{
    const paper_id = ctx.request.params.id;
    const mongoId = new mongo.ObjectId(paper_id);
    let paper = new Paper();
    await readDocument(Paper.AUTHORCOLLECTION,"_id",mongoId).then(
        function (res){
            paper.change(res[0]);
        }
    )
    paper.addPayment();
    await updateDocument(Paper.AUTHORCOLLECTION,"_id",mongoId,paper.getSaveToDb());
    ctx.response.set('content-type','application/json');
    ctx.body = "success";
});

router.put("/payment/attendee/:id",async ctx=>{
    const userid = ctx.request.params.id;
    //const mongoId = new mongo.ObjectId(userid);
    let result = null;
    await readDocument(Payment.COLLECTION,"userid",userid).then(
        function (res){
            result = res;
        }
    )
    if(result.length===0){
        let payment = new Payment();
        payment.userid = userid;
        payment.amount = "3500";
        saveDocument(Payment.COLLECTION,[payment.getSaveToDb()]);
    }
    ctx.response.set('content-type','application/json');
    ctx.body = "success";
});
exports.UserServices=router;