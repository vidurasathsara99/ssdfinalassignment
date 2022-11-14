import {UserRoles} from "./roles.js";
exports.getUsernameType = function getUsernameType(username){
    if(typeof username==="undefined"){
        return null;
    }
    let prefix = username.charAt(0);
    switch (prefix){
        case 'S': return UserRoles.ADMIN;
        case 'E': return UserRoles.EDITOR;
        case 'C': return UserRoles.REVIEWER;
        case 'R': return UserRoles.RESEARCHER;
        case 'W': return UserRoles.WORKSHOP_PRESENTER;
        case 'A': return UserRoles.ATTENDEE;
        default: return null;
    }
}