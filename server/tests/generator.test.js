const usernameGEN = require('../api/util/username-generator');
const passwordGEN = require('../api/util/password-generator');
const {UserRoles} = require("../api/common/roles");

test("Username for admin is generated Correctly",()=>{
    const adminUsername = usernameGEN.generateUsername(UserRoles.ADMIN);
    expect(adminUsername.charAt(0)).toEqual("S");
});
test("Username for manager is generated Correctly",()=>{
    const editorUsername = usernameGEN.generateUsername(UserRoles.MANAGER);
    expect(editorUsername.charAt(0)).toBe("R");
});
test("Username for worker is generated Correctly",()=>{
    const revUsername = usernameGEN.generateUsername(UserRoles.WORKER);
    expect(revUsername.charAt(0)).toBe("W");
});