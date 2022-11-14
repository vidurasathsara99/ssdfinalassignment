const Router = require('@koa/router');
//from mongo
const mongo = require('mongodb');
const saveDocument = require('../api/db/mongodb.api').saveDocument;
const saveDocumentGetId = require('../api/db/mongodb.api').saveDocumentGetId;
const readDocument = require('../api/db/mongodb.api').readDocument;
const updateDocument = require('../api/db/mongodb.api').updateDocument;
//user defined api
const Login = require('../api/login.api').Login;
const Profile = require('../api/profile.api').Profile;
//router prefix
const router = new Router({prefix:'/profile'});
//get profile details
router.get("/:id",async ctx=>{
    const userId = ctx.params.id;
    try {
        let id = new mongo.ObjectId(userId);
        let profileData = new Profile();
        await readDocument(Profile.COLLECTION, "_id", id).then(
            function (resolved) {
                if(resolved.length>0){
                    profileData.loadFromDb(resolved[0]);
                    ctx.response.body = profileData;
                }else{
                    ctx.response.body = "Access Denied!";
                }
            }
        )
    }catch (e){
        console.log(e);
        ctx.body = e;
    }
});
//update profile
router.put("/:id",async ctx=>{
    const userId = ctx.params.id;
    ctx.response.set('Content-Type','application/json');
    console.log("id:"+userId);
    try{
        let id = new mongo.ObjectId(userId);
        let profile = new Profile();
        await readDocument(Profile.COLLECTION, "_id", id).then(
            function (res){
                profile.loadFromDb(res[0]);
                profile.change(ctx.request.body);
            }
        )
        let login = new Login();
        let changePassword = ctx.request.body.change_password;
        await readDocument(Login.COLLECTION,"_id",id).then(
            function (res){
                login.loadFromDB(res[0]);
            }
        )
        let confirm_password = ctx.request.body.confirm_password;
        if(login.passwordIsValid(confirm_password)){
            profile.role = login.role;
            await updateDocument(Profile.COLLECTION,"_id",id,profile.getSaveToDB());
            if(changePassword){
                login.setPassword(ctx.request.body.password);
            }
            await updateDocument(Login.COLLECTION,"_id",id,login.getSaveToDB());
        }
        ctx.body = "success";
    }catch (e){
        ctx.body = e;
    }
});
//deactivate profile
router.delete("/:id",async ctx=>{
    const userId = ctx.params.id;
    ctx.response.set('Content-Type','application/json');
    try{

    }catch (e){
        ctx.body = e;
    }
})
exports.ProfileRouter=router;