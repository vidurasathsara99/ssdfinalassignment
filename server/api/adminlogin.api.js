const {UserRoles} = require("./common/roles");
const login = require('./login.api').Login;
exports.AdminLogin = class AdminLogin extends login{
    setRoleAdmin(role){
        this.role = role;
    }
    static defaultAdministrator(){
        let login = new AdminLogin();
        login.setRole(UserRoles.ADMIN);
        login.setUsername("SOO1CXBAV776P");
        login.setPassword("+BwELwE5n@1");
        return login;
    }
}