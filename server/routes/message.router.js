const Router = require('@koa/router');
const { ResponseMessage } = require('../api/response-message.api');
const crypto = require('crypto');
const { Message } = require('../api/message.api');
const Login = require('../api/login.api').Login;
const nacl = require('tweetnacl');
const util = require('tweetnacl-util')

const mongo = require('mongodb');
const { readDocument, saveDocument } = require('../api/db/mongodb.api');

const router = new Router({
    prefix:'/msg'
});

router.get("/list/:id", async ctx=>{
    const userid = ctx.request.params.id;
    ctx.response.set('content-type','application/json');

    let listOfMessages = [];
    await readDocument(Message.COLLECTION, "userid", userid).then(
        function (messages){
            listOfMessages = messages;
        });
    
    ctx.body = listOfMessages;
})

const hex2buff = (hex) => {
    return Buffer.from(hex, 'hex');
}

router.post("/new", async ctx=>{
    //add new message
    let responseMessage = new ResponseMessage();
    responseMessage.append(ctx.request.body);

    ctx.response.set('content-type','application/json');
    //decrypt check
    try{
        let decryptedMessage = nacl.sign.open(responseMessage.getSignature(), responseMessage.getPublicKey());
        let message = new Message()
        message.from(JSON.parse(util.encodeUTF8(decryptedMessage)))
        //console.log(message.getSaveToDb())
        
        
        //check if userid is valid
        let userExists = false;
        const mongoId = new mongo.ObjectId(message.userid);
        await readDocument(Login.COLLECTION,"_id",mongoId).then(
            function (res){
                //console.log(res[0])
                if(res){
                    userExists = true;
                }
            }
        )
        if(userExists){
            saveDocument(Message.COLLECTION, [message.getSaveToDb()])

            ctx.body = `{authorized:true, message: '${message.message}'}`;
        }else{
            ctx.body = `{authorized:false, message: ''}`;
        }
    }catch(exception){
        //Decryption Failure
        //improper public key

        ctx.body = "{authorized:false, message: ''}";
    }
})

exports.MessageRouter=router;