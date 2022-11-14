import jest from 'jest';
import React from 'react';

import {UserRoles} from "../api/roles";
import {getUsernameType} from "../api/get-username-type";

const adminDummyUsername = "Sxxxxxxx";
test("request username type returns ADMIN on username = "+adminDummyUsername,()=>{
    expect(getUsernameType(adminDummyUsername)).toBe(UserRoles.ADMIN);
});