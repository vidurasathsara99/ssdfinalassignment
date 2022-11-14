class UserRoles{
    static ADMIN = "ADMIN";
    static EDITOR = "EDITOR";
    static REVIEWER = "REVIEWER";
    static RESEARCHER = "RESEARCHER";
    static WORKSHOP_PRESENTER="WORKSHOP-PRESENTER";
    static ATTENDEE="ATTENDEE";
}
exports.UserRoles = UserRoles;
exports.getRole = function getRole(type){
    type = type.toLowerCase();
    if(type==="attendee"||type==="guest"){
        return UserRoles.ATTENDEE;
    }else if(type==="author"||type==="researcher"){
        return UserRoles.RESEARCHER;
    }else if(type==="workshop"||type==="workshop_presenter"||type==="presenter"){
        return UserRoles.WORKSHOP_PRESENTER;
    }else if(type==="editor"){
        return UserRoles.EDITOR;
    }else if(type==="reviewer"){
        return UserRoles.REVIEWER;
    }else if(type==="admin"){
        return UserRoles.ADMIN;
    }else{
        return null;
    }
}