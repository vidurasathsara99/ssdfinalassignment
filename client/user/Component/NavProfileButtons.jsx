import React from "react";
import "url:https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css";
import Cookies from 'js-cookie';
import {getUsernameType} from "../api/get-username-type";
import {UserRoles} from "../api/roles";
import img from "url:../assets/img/profile.png";
import {dropdownHover} from "../assets/js/dropdown-hover";

export default class NavProfileButtons extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            username:Cookies.get('username',null)
        }
        this.handleDropDownHover=this.handleDropDownHover.bind(this);
    }
    handleDropDownHover(show, toggler_id, dropdown_id){
        //dropdownHover(true,'profile-img','profile-dropdown')
        dropdownHover(show,toggler_id,dropdown_id);
        //dropdownHover(false,'profile-img','profile-dropdown')
    }
    render() {
        const username = this.state.username;
        let type = getUsernameType(username);
        if(type==null){
            return '';
        }else{
            return <React.Fragment>
                <div className="d-flex me-3 nav-item" onMouseOver={this.handleDropDownHover.bind(this,true,'profile-img','profile-dropdown')}
                     id="profile-name">{username}
                </div>
                <div className="d-flex me-5 dropdown nav-item">
                    <img className="dropdown-toggle" id="profile-img" data-bs-toggle="dropdown"
                         src={img} height="40" width="40" alt="img" onMouseOver={this.handleDropDownHover.bind(this,true,'profile-img','profile-dropdown')}/>
                    <ul className="dropdown-menu" id="profile-dropdown" style={{left:"-20px",minWidth: "5px"}}
                        aria-labelledby="navbarDropdown" onMouseMove={this.handleDropDownHover.bind(this,true,'profile-img','profile-dropdown')}
                        onMouseOut={this.handleDropDownHover.bind(this,false,'profile-img','profile-dropdown')}>
                        <li><a className="dropdown-item" href="/profile">Profile</a></li>
                        <li><a className="dropdown-item" href="/sign-out">Sign Out</a></li>
                    </ul>
                </div>
            </React.Fragment>;
        }
    }
}