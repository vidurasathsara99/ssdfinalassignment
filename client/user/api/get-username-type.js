import {UserRoles} from "./roles.js";
exports.getUsernameType = function getUsernameType(username){
    if(typeof username==="undefined"){
        return null;
    }
    let prefix = username.charAt(0);
    switch (prefix){
        case 'S': return UserRoles.ADMIN;
        case 'R': return UserRoles.MANAGER;
        case 'W': return UserRoles.WORKER;
        default: return null;
    }
}