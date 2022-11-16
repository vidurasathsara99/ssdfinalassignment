exports.ResponseMessage = class ResponseMessage{
    constructor(){
        this.pubkey = "";
        this.signedMessage = "";
    }
    append(obj){
        Object.assign(this,obj);
    }
    getPublicKey(){
        return Buffer.from(this.pubkey, 'hex')
    }
    getSignature(){
        return Buffer.from(this.signedMessage, 'hex');
    }
}