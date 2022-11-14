exports.getbundleUserDetails = function getbundleUserDetails(userType){
    let email = document.getElementsByName("email")[0].value;
    let password = document.getElementsByName("password")[0].value;
    let phone1 = document.getElementsByName("phone1")[0].value;
    let phone2 = document.getElementsByName("phone2")[0].value;
    let address = document.getElementsByName("address")[0].value;
    return {"email":email,"password":password,"phone1":phone1,"phone2":phone2,"address":address,"role":userType};
}