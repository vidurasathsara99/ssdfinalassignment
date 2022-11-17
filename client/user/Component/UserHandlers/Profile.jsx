import React from "react";
import resources from "../../resource.config";
import UserAdded from "./UserAdded";
import Cookies from 'js-cookie';
import {getbundleUserDetails} from "./UserAddedFunctions";
export default class Profile extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            username:Cookies.get('username',null),
            userid:Cookies.get('userid',null),
            data:null,
            server_msg:null
        }
        this.fetchProfileFromServer=this.fetchProfileFromServer.bind(this);
        this.updateProfile=this.updateProfile.bind(this);
        this.bundleUserDetails=this.bundleUserDetails.bind(this);
    }
    componentDidMount() {
        //get profile from server using userid
        this.fetchProfileFromServer();
    }
    async fetchProfileFromServer(){
        const userid = this.state.userid;
        await fetch(resources.proxy("/profile/"+userid),{
            method:'get',
            headers:{'Accept':'application/json', 'Authorization':`Bearer ${Cookies.get('jwt_cookie', null)}`}
        }).then(r=>r.text()).then(d=>this.setState({data:JSON.parse(d)})).catch(e=>console.log(e));
        const data = this.state.data;
        console.log("data: "+JSON.stringify(data));
    }
    async updateProfile(){
        const userid = this.state.userid;
        const confirm_password = this.current_password.value;
        if(confirm_password.length===0){
            this.setState({server_msg:"Current password is required to make changed!"});
            return;
        }
        console.log("sending profile: "+JSON.stringify(this.bundleUserDetails(confirm_password)));
        await fetch(resources.proxy("/profile/"+userid),{
            method:'put',
            headers:{'Content-Type':'application/json', 'Authorization':`Bearer ${Cookies.get('jwt_cookie', null)}`},
            body:JSON.stringify(this.bundleUserDetails(confirm_password))
        }).then(r=>r.text()).then(d=>this.setState({server_msg:d})).catch(e=>console.log(e));
        const server_msg = this.state.server_msg;
        if(server_msg==="success"){
            await this.fetchProfileFromServer();
        }
    }
    bundleUserDetails(confirm_password){
        const details = getbundleUserDetails(null);
        let change_password = false;
        if(details.password.length>0){
            change_password = true;
        }
        return {...details,"change_password":change_password,"confirm_password":confirm_password}
    }
    render() {

        const username = this.state.username;
        const data = this.state.data;
        const server_msg = this.state.server_msg;
        return <React.Fragment>
            <h5>User Profile</h5>
            {server_msg!==null&&server_msg!=="success"?server_msg:''}

                <table>
                <thead><tr><th></th><th></th></tr></thead>
                <tbody>
                <tr>
                    <td><label>Username&nbsp;</label></td>
                    <td>
                        <input type={"text"}  class="form-control " value={username} disabled={true}/>
                    </td>
                </tr>
                <UserAdded obj={data}/>
                <tr>
                    <td><label>Current Password&nbsp;</label></td>
                    <td>
                        <input type={"password"}  class="form-control " placeholder={"Enter current password"} ref={(ref) => {this.current_password = ref}}/>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td style={{textAlign:'right'}}>
                        <button class="btn btn-success" onClick={this.updateProfile}>Save</button>
                    </td>
                </tr>
                </tbody>
            </table>

        </React.Fragment>;

    }
}