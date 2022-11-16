import React from "react";
import "url:https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css";
import NavigateItemHolder from "./NavigateItemHolder";
import NavProfileButtons from "./NavProfileButtons";
import Cookies from 'js-cookie';
import {getUsernameType} from "../api/get-username-type";
import {UserRoles} from "../../../server/api/common/roles";
export default class NavigationBar extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            username:Cookies.get('username',null)
        }
        this.getAdminNavigations=this.getAdminNavigations.bind(this);
        this.getReviewerNavigations=this.getReviewerNavigations.bind(this);
        this.getUserNavigations=this.getUserNavigations.bind(this);
    }
    //Navigation buttons for each user type
    getAdminNavigations(){
        return <React.Fragment>
            <NavigateItemHolder path={"/admin/uam"} name={"Add Users"}/>
            <NavigateItemHolder path={"/admin/uac"} name={"UAC"}/>
        </React.Fragment>;
    }
    getReviewerNavigations(){
        return <React.Fragment>
            <NavigateItemHolder path={"/rev/dashboard"} name={"Dashboard"}/>
            <NavigateItemHolder path={"/rev/papers"} name={"Conference papers"}/>
            <NavigateItemHolder path={"/rev/proposals"} name={"Workshop papers"}/>
        </React.Fragment>;
    }
    getUserNavigations(){
        return <React.Fragment>
            <NavigateItemHolder path={"/user/dashboard"} name={"Dashboard"}/>


        </React.Fragment>;
    }
    getWorkerNavigations(){
        return <React.Fragment>
            <NavigateItemHolder path={"/worker"} name={"Home"}/>
        </React.Fragment>
    }
    render() {
        const username = this.state.username;
        const usertype = getUsernameType(username);
        let navContent = [];
        if(usertype===UserRoles.ADMIN){
            navContent.push(this.getAdminNavigations());
        }else if(usertype===UserRoles.REVIEWER){
            navContent.push(this.getReviewerNavigations());
        }else{
            navContent.push(<NavigateItemHolder path={"#"} name={"ABC Company"}/>);
        }
        return <React.Fragment>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {navContent}
            </ul>
            <NavProfileButtons/>
        </React.Fragment>
    }
}