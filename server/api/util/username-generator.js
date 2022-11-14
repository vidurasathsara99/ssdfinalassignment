const UserRoles = require('../common/roles').UserRoles;

const Role = require('../common/roles').UserRoles;
exports.generateUsername = function generateUsername(role){
    let prefix = '';
    if(role===Role.ADMIN){
        prefix = 'SAO';
    }else if(role===Role.EDITOR){
        prefix = 'ECR';
    }else if(role===Role.REVIEWER){
        prefix = 'CRR';
    }else if(role===Role.RESEARCHER){
        prefix = 'RA';
    }else if(role===Role.WORKSHOP_PRESENTER){
        prefix = 'WSP';
    }else if(role===Role.ATTENDEE){
        prefix = 'AU';
    }else{
        prefix = "UN";
    }
    //2nd part of username
    let currentDT = new Date();
    //year 2021 -> 21
    let year = currentDT.getFullYear();
    year = year-2000;
    //month
    const month = currentDT.getMonth()+1;
    let monthString = '';
    if(month<10)
        monthString = '0'+month;
    else monthString = month;
    //day
    const date = currentDT.getDate();
    let dateString = '';
    if(date < 10)
        dateString = '0'+date;
    else dateString = date;
    //3rd part, 3 random digits
    const digit3 = Math.floor(Math.random()*999);
    //4th part, a letter
    const alphabet = "A.B.C.D.E.F.G.H.I.J.K.L.M.N.O.P.Q.R.S.T.U.V.W.X.Y.Z";
    const charArray  = alphabet.split('.');
    const number = Math.floor(Math.random()*24);
    const letter = charArray[number];
    //apply parts together
    return (prefix+year+monthString+dateString+digit3+letter);
}
exports.UserRoleIsValid = function UserRoleIsValid(role){
    if(role===UserRoles.ADMIN){
        return true;
    }else if(role===UserRoles.EDITOR){
        return true;
    }else if(role===UserRoles.REVIEWER){
        return true;
    }else if(role===UserRoles.RESEARCHER){
        return true;
    }else if(role===UserRoles.WORKSHOP_PRESENTER){
        return true;
    }else return role === UserRoles.ATTENDEE;
}