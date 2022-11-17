import React from "react";
import resources from "../../resource.config";
import Cookies from "js-cookie";
import Footer from "../Footer";
export default class UserAccountControl extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            userid:Cookies.get('userid',null),
            usersFromDb:[],
            showUsers:[],
            server_msg:null
        }
        this.fetchAllUsers=this.fetchAllUsers.bind(this);
        this.filterUsers=this.filterUsers.bind(this);
        this.applyUserBan=this.applyUserBan.bind(this);
        this.resetUserPassword=this.resetUserPassword.bind(this);
    }
    componentDidMount() {
        this.fetchAllUsers();
    }
    async fetchAllUsers(){
        await fetch(resources.proxy("/admin"),{
            method:'get',
            headers: {'Authorization':`Bearer ${Cookies.get('jwt_cookie', null)}`}
        }).then(r=>r.text()).then(d=>this.setState({usersFromDb:JSON.parse(d)})).catch(e=>console.log(e));
        const usersFromDb = this.state.usersFromDb;
        //console.log(JSON.stringify(usersFromDb));
        this.setState({showUsers:[...usersFromDb]});
    }
    async applyUserBan(userid){
        let server_msg = null;
        await fetch(resources.proxy("/admin/user/ban/"+userid),{
            method:'put',
            headers:{'Content-Type':'application/json', 'Authorization':`Bearer ${Cookies.get('jwt_cookie', null)}`},
            body:JSON.stringify({"ban":true})
        }).then(r=>r.text()).then(d=>server_msg=d).catch(e=>console.log(e));
        if(server_msg==="success"){
            await this.fetchAllUsers();
        }
    }
    async unBanUser(userid){
        let server_msg = null;
        await fetch(resources.proxy("/admin/user/ban/"+userid),{
            method:'put',
            headers:{'Content-Type':'application/json', 'Authorization':`Bearer ${Cookies.get('jwt_cookie', null)}`},
            body:JSON.stringify({"ban":false})
        }).then(r=>r.text()).then(d=>server_msg=d).catch(e=>console.log(e));
        if(server_msg==="success"){
            await this.fetchAllUsers();
        }
    }
    async resetUserPassword(username,userid){
        let server_msg = null;
        await fetch(resources.proxy("/admin/user/reset/"+userid),{
            method:'put',
            headers:{'Content-Type':'application/json', 'Authorization':`Bearer ${Cookies.get('jwt_cookie', null)}`},
            body:JSON.stringify({})
        }).then(r=>r.text()).then(d=>server_msg=d).catch(e=>console.log(e));
        server_msg = server_msg.split(".");
        if(server_msg[0]==="success"){
            await this.fetchAllUsers();
            this.setState({server_msg:"user with username:"+username+" new password:"+server_msg[1]});
        }
    }
    filterUsers(){
        const byUsername = this.search_username.value;
        const byEmail = this.search_email.value;
        const byRole = this.search_role.value;
        let showUsers = [];
        const usersFromDb = this.state.usersFromDb;
        let u = false, e = false, r = false, pushed = false;
        if(byUsername.length>0){
            u = true;
        }
        if(byEmail.length>0){
            e = true;
        }
        if(byRole.length>0 && byRole!=="Select"){
            r = true;
        }
        usersFromDb.map(user =>{
            pushed = false;
            if(u && user.username===byUsername){
                showUsers.push(user);
                pushed = true;
            }
            if(e && user.email===byEmail && !pushed){
                showUsers.push(user);
                pushed = true;
            }
            if(r && user.role===byRole && !pushed){
                showUsers.push(user);
                pushed = true;
            }
        })
        if(!u&&!e&&!r){
            showUsers = [...usersFromDb];
        }
        this.setState({showUsers:showUsers});
    }
    render() {
        const showUsers = this.state.showUsers;
        const adminUserid = this.state.userid;
        let records = [];
        if(showUsers.length>0){
            showUsers.map(user =>{
                //console.log(JSON.stringify(user));
                let userBanned = null;
                if(typeof user.status !== "undefined"){
                    if(user.status === "Banned") {
                        userBanned = <button className="btn btn-outline-primary m-lg-1"
                                             onClick={this.unBanUser.bind(this, user._id)}>Unban</button>;
                    }
                }
                if(user._id!==adminUserid) {
                    records.push(<tr>
                        <td><b>{user.username}</b></td>
                        <td>{user.email}</td>
                        <td style={{width: "200px"}}>{user.address}</td>
                        <td>{user.mobile1}<p/>{user.mobile2}</td>
                        <td>{user.role}</td>
                        <td>
                            <button className="btn btn-danger m-lg-1"
                                    onClick={this.applyUserBan.bind(this, user._id)}>Ban
                            </button>
                            {userBanned}
                            <button className="btn btn-warning"
                                    onClick={this.resetUserPassword.bind(this, user.username, user._id)}>Password Reset
                            </button>
                        </td>
                    </tr>);
                }
            });
        }
        const sever_msg = this.state.server_msg;
        return <React.Fragment>
            {sever_msg!=="success"&&sever_msg!==null?sever_msg:""}
            <h6>Search Criteria</h6>
            <div className="p-2" style={{border: "1px solid green", width: "700px"}}>
                <div style={{display: "table-cell"}}>
                    <label>Username</label>
                    <input type="text" placeholder="Username" ref={(ref) => {this.search_username = ref}}/>
                </div>
                <div className="mx-1" style={{display: "table-cell", marginLeft: "3px"}}>
                    <label>Email</label>
                    <input type="text" placeholder="User Email" ref={(ref) => {this.search_email = ref}}/>
                    <select className="mx-1" ref={(ref) => {this.search_role = ref}}>
                        <option>Select</option>
                        <option value={"ADMIN"}>Admin</option>
                        <option value={"WORKER"}>Worker</option>
                        <option value={"MANAGER"}>Manager</option>
                    </select>
                </div>
                <div style={{display: "table-cell"}}>
                    <button className="btn btn-success" onClick={this.filterUsers}>Search</button>
                </div>
            </div>
            <p/>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th className="text-center" scope="col">Address</th>
                    <th>Contacts</th>
                    <th scope="col">Role</th>
                    <th className="text-center" scope="col">Operations</th>
                </tr>
                </thead>
                <tbody>
                {records}
                </tbody>
            </table>
            <div style={{position:"absolute",bottom:0,left:0,width:"100%"}}>
                <Footer/>
            </div>
        </React.Fragment>;
    }
}
{/*
//sample
<tr>
    <td><b>SAD101231231</b></td>
    <td>b.c@cmail.com</td>
    <td style={{width: "200px"}}>no 7/5, Jackson Anthony James mawatha, Katuwala, Boralesgamuwa</td>
    <td>+947298566739<p/>0119085678-3</td>
    <td>Admin</td>
    <td>
        <button className="btn btn-danger m-lg-1">Ban</button>
        <button className="btn btn-danger m-lg-1">Remove User</button>
        <button className="btn btn-warning">Password Reset</button>
    </td>
</tr>
*/}