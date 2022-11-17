class UserRoles{
    static ADMIN = "ADMIN";
    static MANAGER = "MANAGER";
    static WORKER="WORKER";
}
exports.UserRoles = UserRoles;
exports.getRole = function getRole(type){
    type = type.toLowerCase();
    if(type==="manager"){
        return UserRoles.MANAGER;
    }else if(type==="worker"){
        return UserRoles.WORKER;
    }else if(type==="admin"){
        return UserRoles.ADMIN;
    }else{
        return null;
    }
}