exports.Paper = class Paper{
    static AUTHORCOLLECTION = "researchpapers";
    static WORKSHOPCOLLECTION = "workshops";
    static PAYMENTCOLLECTION = "payments";
    constructor() {
        this.id = "";
        this.userid="";
        this.paper_topic = "";
        this.paper_authors = "";
        this.file_base64 = "";
        this.payment = "pending";
        this.status = "on-review";
    }
    getSaveToDb(){
        return {"userid":this.userid,"paper_topic":this.paper_topic,"paper_authors":this.paper_authors,"status":this.status,"file_base64":this.file_base64,"payment":this.payment};
    }
    change(obj){
        Object.assign(this,obj);
    }
    addPayment(){
        this.payment = "paid";
    }
}