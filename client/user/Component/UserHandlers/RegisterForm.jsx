// import React from "react";
// import UserAdded from "./UserAdded";
// import resources from "../../resource.config";
// import {UserRoles,getRole} from "../../api/roles";
// import {getbundleUserDetails} from "./UserAddedFunctions";
// export default class RegisterForm extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state={
//             server_msg:null,userType:null,error_msg:null
//         }
//         this.redirectToLogin=this.redirectToLogin.bind(this);
//         this.handleRegister=this.handleRegister.bind(this);
//         this.handleCheckbox=this.handleCheckbox.bind(this);
//         //this.bundleUserDetails=this.bundleUserDetails.bind(this);
//     }
//     redirectToLogin(){
//         window.location.href = "/";
//     }
//     async handleRegister(){
//         const userType = this.state.userType;
//         if(userType===null){
//             this.setState({error_msg:"Please select a role"});
//             return;
//         }
//         await fetch(resources.proxy("/login/sign-up"), {
//             method: 'post',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify(getbundleUserDetails(userType))
//         }).then(r => r.text()).then(d=>this.setState({server_msg:d})).catch(e=>console.log(e));
//         const server_msg = this.state.server_msg;
//         if(server_msg==="success"){
//             this.redirectToLogin();
//         }
//     }
//     handleCheckbox(check){
//         let chkbx = ['author','workshop','attendee'];
//         let indexOfCheck = chkbx.indexOf(check),i;
//         chkbx.splice(indexOfCheck,1);
//         for(i=0;i<chkbx.length;i++){
//             let element = document.getElementById(chkbx[i]);
//             if(element.checked){
//                 element.checked = false;
//             }
//         }
//         this.setState({userType:getRole(check)});
//     }
//     render() {
//         const server_msg = this.state.server_msg;
//         const error_msg = this.state.error_msg;
//         return <React.Fragment>
//             <center>
//             <div className={"card w-50"} style={{backgroundColor: "#F8EEFF"}}>
//                 <div className={"card-body"}>
//             <p>{server_msg!==null?server_msg:''}</p>
//             <h3 style={{color:"purple"}}>Registration</h3>
//             <table className={"w-75"}>
//                 <thead><tr><th></th><th></th></tr></thead>
//                 <tbody>
//                 <UserAdded obj={"new"}/>
//                 <tr>
//                     <td colSpan={2}>
//                         <p/>
//                         {error_msg!==null?<p style={{color:"red"}}>{error_msg}</p>:''}
//                         <label>Paper Author&nbsp;</label>
//                         <input type={"checkbox"} id={'author'}  onClick={this.handleCheckbox.bind(this,'author')}/>
//                         <p/>
//                         <label>Workshop Presenter&nbsp;</label>
//                         <input type={"checkbox"} id={'workshop'}  onClick={this.handleCheckbox.bind(this,'workshop')}/>
//                         <p/>
//                         <label>Attendee&nbsp;</label>
//                         <input type={"checkbox"} id={'attendee'}  onClick={this.handleCheckbox.bind(this,'attendee')}/>
//                         <p/>
//                     </td>
//                 </tr>
//                 </tbody>
//             </table><p/>
//             <button className="btn btn-primary" onClick={this.handleRegister}>Register</button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//             <button className="btn btn-success" onClick={this.redirectToLogin}>Login</button>
//                 </div>
//             </div>
//            </center>
//         </React.Fragment>
//     }
// }
