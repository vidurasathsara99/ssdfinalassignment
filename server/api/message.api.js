exports.Message = class Message{
    static COLLECTION = "messages";
    constructor(){
        this.userid="";
        this.message="";
    }
    getSaveToDb(){
        let createdDateTime = new Date().toUTCString();

        return {"userid":this.userid,"message":this.message,"createDate":createdDateTime};
    }
    from(obj){
        Object.assign(this,obj);
    }
}