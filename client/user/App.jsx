import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
//components
import LoginForm from "./Component/UserHandlers/LoginForm";
import RegisterForm from "./Component/UserHandlers/RegisterForm";
import SignOut from "./Component/UserHandlers/SignOut";
import Profile from "./Component/UserHandlers/Profile";
import PasswordResetForm from "./Component/UserHandlers/PasswordResetForm";
//sub routes
import AdminRouter from "./Component/Admin/ARouter";
import GenericUserRouter from "./Component/User/URouter";
import ReviewRouter from "./Component/Reviewer/RRouter";
export default () =>{
    return <Router>
        <Switch>
            <Route exact path={"/"}>
                <LoginForm/>
            </Route>
            <Route exact path={"/sign-up"}>
                <RegisterForm/>
            </Route>
            <Route exact path={"/sign-out"}>
                <SignOut/>
            </Route>
            <Route exact path={"/profile"}>
                <Profile/>
            </Route>
            <Route exact path={"/forgot-password"}>
                <PasswordResetForm/>
            </Route>
            <Route path={"/admin"}>
                <AdminRouter/>
            </Route>
            <Route path={"/rev"}>
                <ReviewRouter/>
            </Route>
            <Route path={"/reviewer"}>
                <ReviewRouter/>
            </Route>
            <Route path={"/user"}>
                <GenericUserRouter/>
            </Route>
        </Switch>
    </Router>
}