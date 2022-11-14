import React from "react";
import resources from "../../resource.config";
export default class PasswordResetForm extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            server_msg:null
        }
        this.resetPasswordInServer=this.resetPasswordInServer.bind(this);
    }
    async resetPasswordInServer(){
        const username = this.username.value;
        const email = this.email.value;
        await fetch(resources.proxy("/login/reset"),{
            method:'put', headers:{'Content-Type':'application/json'},body:JSON.stringify({"username":username,"email":email})
        }).then(r=>r.text()).then(d=>this.setState({server_msg:d})).catch(e=>console.log(e));
    }
    render() {
        const server_msg = this.state.server_msg;
        return <React.Fragment>
            <center>
                <div className={"card w-25"} style={{backgroundColor: "#F8EEFF"}}>
                    <div className={"card-body"}>
                        <h3 style={{color:"purple"}}>Password Reset Request</h3>
            {server_msg!==null?server_msg:""}
            <p/>
            <table className="w-100">
                <thead><tr><th></th><th></th></tr></thead>
                <tbody>
                <tr>
                    <td><label>Enter Username</label></td><td>
                    <input type={"text"}  class="form-control " placeholder={"Enter username"} ref={(ref) => {this.username = ref}}/></td>
                </tr>
                <tr>
                    <td><label>Enter Email</label></td><td>
                    <input type={"text"}  class="form-control " placeholder={"Enter email"} ref={(ref) => {this.email = ref}}/></td>
                </tr>
                </tbody>
            </table>
            <br/>
            <button class="btn btn-danger" onClick={this.resetPasswordInServer}>Request Reset</button> &nbsp;
            <button class="btn btn-success" onClick={()=>{window.location.href="/"}}>Login</button>
                    </div>
                </div>
            </center>
        </React.Fragment>
    }
}
