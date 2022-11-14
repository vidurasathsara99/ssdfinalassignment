const usernameGEN = require('../api/util/username-generator');
const passwordGEN = require('../api/util/password-generator');
const {UserRoles} = require("../api/common/roles");

test("Username for admin is generated Correctly",()=>{
    const adminUsername = usernameGEN.generateUsername(UserRoles.ADMIN);
    expect(adminUsername.charAt(0)).toEqual("S");
});
test("Username for editor is generated Correctly",()=>{
    const editorUsername = usernameGEN.generateUsername(UserRoles.EDITOR);
    expect(editorUsername.charAt(0)).toBe("E");
});
test("Username for reviewer is generated Correctly",()=>{
    const revUsername = usernameGEN.generateUsername(UserRoles.REVIEWER);
    expect(revUsername.charAt(0)).toBe("C");
});