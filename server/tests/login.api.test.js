//imported from admin login api
//extends login api
const Login = require('../api/adminlogin.api').AdminLogin;
//import roles
const Role = require('../api/common/roles').UserRoles;
//imported from mongodb api
const checkDB = require('../api/db/mongodb.api').connectDB;
const saveDocument = require('../api/db/mongodb.api').saveDocument;
const readDocument = require('../api/db/mongodb.api').readDocument;
const updateDocument = require('../api/db/mongodb.api').updateDocument;
const deleteDocument = require('../api/db/mongodb.api').deleteDocument;
//imported to generate a matching username based on role
const generateUsername = require('../api/util/username-generator').generateUsername;
//predefined details
const password = "+ABp_03CnQxryP";
const login = new Login();
const username = generateUsername(Role.MANAGER);
console.log("username generated: "+username);
login.setUsername(username);
login.setPassword(password);
login.setRole(Role.ADMIN);

//test login class hash method
test('validate crypto-Hash 256SHA on a password',()=>{
    expect(login.passwordIsValid(password)).toBe(true);
});
//test db connection
test('checkDB Connection',()=>{
    expect(async () => await checkDB()).not.toThrow();
});
//save a document
test('save a Document to db', ()=>{
    expect(() => saveDocument(Login.COLLECTION,[login.getSaveToDB()])).not.toThrow();
});
//read the saved document
test('read a Document from db',()=>{
   return readDocument(Login.COLLECTION,Login.USERNAME,username).then(dbArray => {
       const savedLogin = new Login();
       savedLogin.loadFromDB(dbArray[0]);
       expect(savedLogin.username).toBe(login.username);
   });
});
//change the password of the login that was saved
test('update a Document in db',()=>{
    let newLogin = login;
    const update_password = "PnB013_nQxryoS";
    newLogin.setPassword(update_password);
    expect(async () => await updateDocument(Login.COLLECTION,Login.USERNAME,username,newLogin.getSaveToDB())).not.toThrow();
    return readDocument(Login.COLLECTION,Login.USERNAME,username).then(dbArray =>{
        let savedLogin = new Login();
        savedLogin.loadFromDB(dbArray[0]);
        expect(savedLogin.passwordIsValid(update_password)).toBe(true);
    });
});
//delete the document that was saved
/*
test('delete a Document from db',()=>{
    return deleteDocument(Login.COLLECTION,Login.USERNAME,username).then(result =>{
        expect(result.deletedCount).toBe(1);
    });
});
 */
//should run at end
afterAll(()=>{
      return deleteDocument(Login.COLLECTION,Login.USERNAME,username).then(result =>{
        expect(result.deletedCount).toBe(1);
    });
})