const Router = require('@koa/router');
//from mongo
const saveDocument = require('../api/db/mongodb.api').saveDocument;
const saveDocumentGetId = require('../api/db/mongodb.api').saveDocumentGetId;
const readDocument = require('../api/db/mongodb.api').readDocument;
//user defined api
const Login = require('../api/login.api').Login;
const Profile = require('../api/profile.api').Profile;
const usernameGen = require('../api/util/username-generator');
const passwordGen = require('../api/util/password-generator');
const {readDocumentWithQuery} = require("../api/db/mongodb.api");
const {AdminLogin} = require("../api/adminlogin.api");
const {countOfDocuments} = require("../api/db/mongodb.api");
//router prefix
const router = new Router({prefix:'/login'});
const mongo = require('mongodb');
const {updateDocument} = require("../api/db/mongodb.api");
//post method in login
router.post('/',async (context)=>{
    const username = context.request.body.username;
    const password = context.request.body.password;
    let userFromDB;
    try{
        let haveusers = 0;
        await countOfDocuments(Login.COLLECTION).then(
            function (res){
                if(res){
                    haveusers = res;
                    //no users.... then auto add default admin
                }
            }
        )
        if(haveusers===0){
            let admin = new AdminLogin();//allows to add role Admin
            admin = AdminLogin.defaultAdministrator();
            let adminProfile = new Profile();
            adminProfile.role = admin.role;
            await saveDocumentGetId(Login.COLLECTION,[admin.getSaveToDB()]).then(
                function (res){
                    adminProfile.id = res.insertedIds[0].toString();
                }
            )
            saveDocument(Profile.COLLECTION,[adminProfile.getSaveToDB()]);
        }
        await readDocument(Login.COLLECTION,"username",username).then(
            function(resolved){
                userFromDB = resolved;
            }
        );
        context.response.set('Content-Type','application/json');//same as context.response.set
        if (userFromDB.length<1){
            console.log("No users found!");
            context.response.body ="Invalid Account!";
        }else{
            //if has value
            let login = new Login();
            login.loadFromDB(userFromDB[0]);
            //console.log("loaded: "+JSON.stringify(login.getSaveToDB()));
            if(typeof login.ban !== "undefined"){
                if(login.ban==="Banned"){
                    context.response.body = "Your Account has been banned!";
                    return;
                }
            }
            if (login.passwordIsValid(password)) {
                context.response.body = "success."+login.login_id;
            } else {
                context.response.body = "Invalid Password!";
            }
        }
    }catch (e){
        console.log(e);
        context.body=e;
    }
});
//handles http://localhost:3000/login/sign-up
router.post('/sign-up',async context=>{
    console.log(JSON.stringify(context.request.body));
    let profile = new Profile();
    profile.change(context.request.body);
    console.log("new sign up>>"+ JSON.stringify(profile));
    context.response.set('Content-Type','application/json');
    let usersFromDB,i;
    try{
        if(!usernameGen.UserRoleIsValid(profile.role)){
            context.body.status(503).send("access-denied");
        }else {
            await readDocument(Profile.COLLECTION, "email", profile.email).then(
                function (resolved) {
                    usersFromDB = resolved;
                }
            );
            if (usersFromDB.length > 0) {
                for (i = 0; i < usersFromDB.length; i++) {
                    if (usersFromDB[0].role === profile.role) {
                        context.response.body = "Account with same email already exists!";
                    }
                }
            } else {
                let login = new Login();
                login.setRole(profile.role);
                login.setPassword(context.request.body.password);
                const username = usernameGen.generateUsername(profile.role);
                login.setUsername(username);
                await saveDocumentGetId(Login.COLLECTION, login.getSaveToDB()).then(
                    function (resolved){
                        //console.log(JSON.stringify(resolved));
                        profile.id = resolved.insertedIds[0].toString();
                    }
                )
                //console.log("profile id: "+profile.id);
                saveDocument(Profile.COLLECTION, [profile.getSaveToDB()]);
                //context.response.status = 200;
                context.response.body = "username = "+login.username;
            }
        }
    }catch (e){
        context.body = e;
        console.log(e);
    }
});
//password reset
router.put("/reset",async ctx=>{
    const username = ctx.request.body.username;
    const email = ctx.request.body.email;
    console.log("username"+username+" e:"+email);
    let login = new Login();
    let found = false, id=0;
    ctx.response.set('Content-Type','application/json');
    await readDocument(Login.COLLECTION,"username",username).then(
        function (result){
            if(result.length>0) {
                found = true;
                id = new mongo.ObjectId(result[0]._id);
                login.loadFromDB(result[0]);
            }
        }
    )
    await readDocument(Profile.COLLECTION,"_id",id).then(
        function (res){
            if(res.length===0){
                found = false;
                console.log(JSON.stringify(res));
            }
        }
    )
    if(found){
        let new_password = passwordGen.generatePassword();
        login.setPassword(new_password);
        //console.log("u: "+JSON.stringify(login.getSaveToDB()));
        await updateDocument(Login.COLLECTION,"_id",id,login.getSaveToDB());
        ctx.body = "We applied a new password: "+new_password;
    }else{
        ctx.body = "Access Denied!";
    }
});
exports.LoginRouter=router;