const Router = require('@koa/router');
const {Worker} = require('worker_threads');
//from mongo
const mongo = require('mongodb');
const saveDocument = require('../api/db/mongodb.api').saveDocument;
const saveDocumentGetId = require('../api/db/mongodb.api').saveDocumentGetId;
const readDocument = require('../api/db/mongodb.api').readDocument;
const readAllDocuments = require('../api/db/mongodb.api').readAllDocuments;
//functions
const usernameGen = require('../api/util/username-generator');
const passwordGen = require('../api/util/password-generator');
const CSV_Worker = require('../api/worker/csv-worker.js');
const {updateDocument} = require("../api/db/mongodb.api");
//model classes
const Login = require('../api/adminlogin.api').AdminLogin;
const Profile = require('../api/profile.api').Profile;
//router prefix
const router = new Router({
    prefix:'/admin'
});
router.post('/', async ctx=>{
    const file_base64 = ctx.request.body.file;
    const file_format = ctx.request.body.file_type;
    const userid = ctx.request.body.userid;
    const email = ctx.request.body.email;
    const role = ctx.request.body.role;
    //console.log("admin userid:"+userid+" role:"+role+" file: "+file_base64+" file_type:"+file_format+ " email:"+email);
    ctx.response.set('content-type','application/json');
    if(typeof file_base64 !== "undefined"){

        let base64 = file_base64.substring(file_base64.lastIndexOf(','),file_base64.length);
        let file_string = new Buffer(base64,'base64').toString('utf8');
        console.log("text>>"+file_string);
        //multi-threaded user addition
        console.log(CSV_Worker.worker);
        const csvServiceWorker = new Worker(CSV_Worker.worker,{eval:true});
        csvServiceWorker.postMessage({"file":file_string,"filterStart":"Administrators","filterEnd":"Editor"});
        csvServiceWorker.onmessage=(e)=>{
            let result = e.data;
            console.log(result);
        }
        //multi-thread end
        ctx.body = "Server got your data!";
    }
    else if(typeof email !== "undefined"){
        //generate username
        let generatedUsername = usernameGen.generateUsername(role);
        let generatedPassword = passwordGen.generatePassword();
        //add generated as a model
        let login = new Login();
        login.setUsername(generatedUsername);
        login.setPassword(generatedPassword);
        login.setRoleAdmin(role);
        //save login model and get it's object id
        let generatedMongoId;
        await saveDocumentGetId(Login.COLLECTION,login.getSaveToDB()).then(
            function (res){
                //console.log("id:"+JSON.stringify(res.insertedIds[0]));
                generatedMongoId = res.insertedIds[0];
            }
        )
        let profile = new Profile();
        //add login id to profile id
        profile.email = email;
        profile.id = new mongo.ObjectId(generatedMongoId);
        profile.role = role;
        //save profile
        saveDocument(Profile.COLLECTION,[profile.getSaveToDB()]);
        //send back username and password for the newly generated account
        ctx.body = {"username":generatedUsername,"password":generatedPassword};
    }else{
        ctx.body = "Invalid";
    }
});
router.get("/",async ctx=>{
    ctx.response.set('content-type','application/json');
    let profileS = []
    await readAllDocuments(Profile.COLLECTION).then(
       function (profiles){
           profileS = profiles;
       });
    for(let i=0;i<profileS.length;i++){
        let id = new mongo.ObjectId(profileS[i]._id);
        await readDocument(Login.COLLECTION,"_id",id).then(
            function (login_data){
                //console.log(JSON.stringify(login_data[0].username));
                profileS[i]["username"] = login_data[0].username;
                if(typeof login_data[0].ban !== "undefined"){
                    profileS[i]["status"] = login_data[0].ban;
                }
            }
        )
    }
    //console.log(JSON.stringify(profileS));
    ctx.body = profileS;
});

router.put("/user/ban/:id",async ctx=>{
    const userid = ctx.request.params.id;
    const ban = ctx.request.body.ban;
    let login = new Login();
    const mongoId = new mongo.ObjectId(userid);
    await readDocument(Login.COLLECTION,"_id",mongoId).then(
        function (res){
            login.loadFromDB(res[0]);
        }
    )
    //console.log("ban: "+ban);
    if(ban){
        login["status"]="Banned";
    }else{
        login["status"]="Unbanned";
    }
    await updateDocument(Login.COLLECTION,"_id",mongoId,login.getSaveToDB());
    //console.log(JSON.stringify(login));
    ctx.response.set('content-type','application/json');
    ctx.body = "success";

});

router.put("/user/reset/:id", async ctx=>{
    const userid = ctx.request.params.id;
    let login = new Login();
    const mongoId = new mongo.ObjectId(userid);
    await readDocument(Login.COLLECTION,"_id",mongoId).then(
        function (res){
            login.loadFromDB(res[0]);
        }
    )
    let new_password = passwordGen.generatePassword()
    //console.log("uid:"+userid+" p:"+new_password);
    login.setPassword(new_password);
    await updateDocument(Login.COLLECTION,"_id",mongoId,login.getSaveToDB());
    ctx.response.set('content-type','application/json');
    ctx.body = "success."+new_password;
})
exports.AdminRouter=router;