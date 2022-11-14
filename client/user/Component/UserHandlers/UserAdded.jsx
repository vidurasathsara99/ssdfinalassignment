import React from "react";
export default function UserAdded(props){
    if(props.obj!==null){
        if(props.obj!=="new")
        {

            const parentGivenValues = props.obj;
            if (typeof parentGivenValues.email !== "undefined") {
                document.getElementsByName("email")[0].value = parentGivenValues.email;
            }
            //this.password.value = parentGivenValues.password;
            if (typeof parentGivenValues.phone1 !== "undefined") {
                document.getElementsByName("phone1")[0].value = parentGivenValues.phone1;
            }
            if (typeof parentGivenValues.phone2 !== "undefined") {
                document.getElementsByName("phone2")[0].value = parentGivenValues.phone2;
            }
            if (typeof parentGivenValues.address !== "undefined") {
                document.getElementsByName("address")[0].value = parentGivenValues.address;
            }
            //this.phone1.value = parentGivenValues.phone1;
            //this.phone2.value = parentGivenValues.phone2;
            //this.address.value = parentGivenValues.address;
        }
    }
    return <React.Fragment>

        <tr>

            <td><label >Email Address&nbsp;</label></td>
            <td>

                <input type={"text"} className="form-control" name={"email"} placeholder={"Enter Email"}/>

            </td>
        </tr>
        <tr>
            <td><label>Password</label></td>
            <td>
                <input type={"password"}  className="form-control " name={"password"} placeholder={"Enter Password"}/>
            </td>
        </tr>
        <tr>
            <td><label>Contact no 1&nbsp;</label></td>
            <td>
                <input type={"text"} className="form-control" name={"phone1"} placeholder={"Enter Contact number"}/>
            </td>
        </tr>
        <tr>
            <td><label>Contact no 2</label></td>
            <td>
                <input type={"text"} className="form-control" name={"phone2"} placeholder={"Enter Additional contact number"}/>
            </td>
        </tr>
        <tr>
            <td><label>Address</label></td>
            <td>
                <input type={"text"}  className="form-control" name={"address"} placeholder={"Enter Address"}/>
            </td>

        </tr>

    </React.Fragment>;
}