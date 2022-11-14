import jest from 'jest';
import React from 'react';
import renderer from 'react-test-renderer';

import LoginForm from "../Component/UserHandlers/LoginForm";

test('Login Form rendered properly',()=>{
    const loginform = renderer.create(<LoginForm/>);
    let tree = loginform.toJSON();
    expect(tree).toMatchSnapshot();
});