import React from "react";
import Footer from "../../Footer";
export default function AddNewUserTypeHtml(type, onClickFunction){
    return <React.Fragment><table>
        <thead>
        <tr><th></th><th></th></tr>
        </thead>
        <tbody>
        <tr key={1}>
            <td colSpan="2" className={"text-center"}><h6>Add New {type}</h6></td>
        </tr>
        <tr>
            <td>User Email</td>
            <td><input type="text" placeholder="Enter user email" id={"user_email"}/>
                <button className="mx-1 btn btn-outline-success" onClick={()=>onClickFunction('user_email',type)}>Add</button>
            </td>
        </tr>
        <tr>
            <td colSpan="2" className={"text-center"}>Server Generated</td>
        </tr>
        <tr>
            <td>Username</td>
            <td><input type="text" id={"admin_show_username"} disabled/></td>
        </tr>
        <tr>
            <td>Password</td>
            <td><input type="text" id={"admin_show_password"} disabled/>
            </td>
        </tr>
        </tbody>
    </table>
        <div style={{position:"absolute", bottom:"0px", width:"100%", left:"-3px"}}>
            <Footer/>
        </div>
    </React.Fragment>;
}