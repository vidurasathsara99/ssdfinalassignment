const mongodbClient = require('mongodb').MongoClient;
require('dotenv').config();
const url = process.env.MONGO_URL;
const database = process.env.MONGO_DATABASE;

//check if connection is successful
exports.connectDB = function connectDB(){
    return new Promise((resolve,error)=>{
        mongodbClient.connect(url,function (err,db){
            if(err) error = err;
            //console.log("Database connected!");
            const dbo = db.db(database);
            //db.close();
        });
    });
}
//save single-any document
exports.saveDocument = function saveDocument(id, obj){
    mongodbClient.connect(url, function (err, db) {
        if (err) throw err;
        const dbo = db.db(database);
        //console.log("saving new document{"+id+"} with ["+JSON.stringify(obj)+"]");
        dbo.collection(id).insertMany(obj, function (err, res) {
            if (err) throw err;
            //console.log("No. of documents inserted: "+res.insertedCount);
            //db.close();//not recommended
        });
    });
}
exports.saveDocumentGetId = function saveDocumentGetId(id, obj){
    return new Promise((resolve)=> {
        mongodbClient.connect(url, function (err, db) {
            if (err) throw err;
            const dbo = db.db(database);
            //console.log("saving new document{"+id+"} with ["+JSON.stringify(obj)+"]");
            dbo.collection(id).insert(obj, function (err, res) {
                if (err) throw err;
                //db.close();//not recommended
                resolve(res);
            });
        });
    });
}
//save image files
//exports.saveImageDocuments = function saveImageDocuments(){
    //not worth as it can be saved into a hard drive
//}
exports.readAllDocuments = async function readAllDocuments(id){
    return new Promise((resolve)=>{
        mongodbClient.connect(url, function (err, db) {
            if (err) throw err;
            const dbo = db.db(database);
            //console.log("mongodb reading all documents of collection{"+id+"}");
            dbo.collection(id).find({}).toArray(function (err, res) {
                if (err) throw err;
                //console.log("mongodb read result:" + JSON.stringify(res));
                resolve(res);
                //console.log("closing db");
                //db.close();//not recommended
            });
        });
    });
}
//read multiple-any document
exports.readDocument = async function readDocument(id, filterFor, filter){
    return new Promise((resolve)=>{
        mongodbClient.connect(url, function (err, db) {
            if (err) throw err;
            const dbo = db.db(database);
            //computed property, let = var
            let query = {[filterFor]: filter};
            //console.log("reading from document{" + id + "} with filters: [" + filterFor + ":" + filter + "]");
            dbo.collection(id).find(query).toArray(function (err, res) {
                if (err) throw err;
                //console.log("mongodb read result:" + JSON.stringify(res));
                resolve(res);
                //console.log("closing db");
                //db.close();//not recommended
            });
        });
    });
}
exports.readDocumentWithQuery = async function readDocumentWithQuery(id, query){
    return new Promise((resolve)=>{
        mongodbClient.connect(url, function (err, db) {
            if (err) throw err;
            const dbo = db.db(database);
            //console.log("reading from document{" + id + "} with filters: [" + filterFor + ":" + filter + "]");
            dbo.collection(id).find(query).toArray(function (err, res) {
                if (err) throw err;
                //console.log("mongodb read result:" + JSON.stringify(res));
                resolve(res);
                //console.log("closing db");
                //db.close();//not recommended
            });
        });
    });
}

//delete single-any document
exports.deleteDocument = async function deleteDocument(id, filterFor, filter){
    return new Promise((resolve)=>{
        mongodbClient.connect(url, function (err, db) {
            if (err) throw err;
            const dbo = db.db(database);
            //computed property
            let query = {[filterFor]: filter};
            dbo.collection(id).deleteOne(query, function (err, res){
                if (err) throw err;
                //console.log("mongodb delete result:" + res.deletedCount);
                resolve(res);
            });
        });
    });
}
//delete single-any-document where query is given
exports.deleteDocumentWithQuery = async function deleteDocumentWithQuery(id, query){
    return new Promise((resolve)=>{
        mongodbClient.connect(url, function (err, db) {
            if (err) throw err;
            const dbo = db.db(database);
            //computed property
            //let query = {[filterFor]: filter};
            dbo.collection(id).deleteOne(query, function (err, res){
                if (err) throw err;
                //console.log("mongodb delete result:" + res.deletedCount);
                resolve(res);
            });
        });
    });
}
//update single-any document
exports.updateDocument = async function updateDocument(id, filterFor, filter, updated_obj){
    return new Promise((resolve)=> {
        mongodbClient.connect(url, function (err, db) {
            if (err) throw err;
            const dbo = db.db(database);
            //computed property
            let query = {[filterFor]: filter};
            let set_update={$set:updated_obj};
            //console.log("update document{" + id + "} with [" + JSON.stringify(updated_obj) + "]");
            dbo.collection(id).updateOne(query, set_update, function (err, res) {
                if (err) throw err;
                //console.log("mongodb update result: " + JSON.stringify(res));
                //db.close();//not recommended
                resolve(res);
            });
        });
    });
}
//update single-any document with query
exports.updateDocumentWithQuery = async function updateDocumentWitQuery(id, query, updated_obj){
    return new Promise((resolve)=> {
        mongodbClient.connect(url, function (err, db) {
            if (err) throw err;
            const dbo = db.db(database);
            //computed property
            //let query = {[filterFor]: filter};
            let set_update={$set:updated_obj};
            console.log("updating document{" + id + "} with [" + JSON.stringify(updated_obj) + "]");
            dbo.collection(id).updateOne(query, set_update, function (err, res) {
                if (err) throw err;
                //console.log("mongodb update result: " + JSON.stringify(res));
                //db.close();//not recommended
                resolve(res);
            });
        });
    });
}
exports.countOfDocuments = async function countOfDocuments(id){
    return new Promise((resolve)=> {
        mongodbClient.connect(url, function (err, db) {
            if (err) throw err;
            const dbo = db.db(database);
            //computed property
            //let query = {[filterFor]: filter};
            //let set_update={$set:updated_obj};
            //console.log("updating document{" + id + "} with [" + JSON.stringify(updated_obj) + "]");
            dbo.collection(id).count(function (err, res) {
                if (err) throw err;
                //console.log("mongodb update result: " + JSON.stringify(res));
                //db.close();//not recommended
                resolve(res);
            });
        });
    });
}