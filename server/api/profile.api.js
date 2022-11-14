const mongo = require('mongodb');
exports.Profile = class Profile{
    static COLLECTION = "contacts";
    constructor() {
        this.id = '';
        this.email = '';
        this.phone1 = '';
        this.phone2 = '';
        this.address = '';
        this.role = '';
    }
    getSaveToDB(){
        let id = new mongo.ObjectId(this.id);
        return {"_id":id,"email":this.email,"phone1":this.phone1,"phone2":this.phone2,"address":this.address,"role":this.role};
    }
    loadFromDb(obj){
        Object.assign(this,obj);
        this.id = obj._id.toString();
    }
    change(newObj){
        let prev_role = this.role;
        Object.assign(this,newObj);
        if(newObj.role===null){
            this.role = prev_role;
        }
    }
}