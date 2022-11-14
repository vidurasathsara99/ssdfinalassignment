import React from "react";
import AddNewUserCsvHtml from "./templates/AddNewUserCsvHtml"
import AddNewUserTypeHtml from "./templates/AddNewUserTypeHtml";
import {getRole} from "../../api/roles";
import * as A from "../../assets/css/btn-styles-admin.css";
import Cookies from 'js-cookie';
import resources from "../../resource.config";
import Footer from "../Footer";
export default class AddNewUsers extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            server_msg:null,
            userid:Cookies.get('userid',null),
            choice:null,
            choice_type:null
        }
        //functions
        this.onClickUserType=this.onClickUserType.bind(this);
        this.onClickCSVType=this.onClickCSVType.bind(this);
        this.onClickAddUser=this.onClickAddUser.bind(this);
        this.onClickUploadCsv=this.onClickUploadCsv.bind(this);
        //styling for buttons
        this.clickedBtnStyle = "btn-orange";
        this.neutralBtnStyle = "btn-blue";
        //user types
        this.types = ["Admin","Presenter","Author"];
    }
    componentDidMount() {
        this.onClickUserType(this.types[0]);
    }
    onClickUserType(type){
        const previous_choice_type = this.state.choice_type;
        this.setState({choice:AddNewUserTypeHtml(type,this.onClickAddUser)});
        this.setState({choice_type:type});
        let clickedBtnId = "adadmin_"+type;
        document.getElementById(clickedBtnId).className = this.clickedBtnStyle;
        if(previous_choice_type!==null && previous_choice_type!==type){
            let prevBtnId = "adadmin_"+previous_choice_type;
            document.getElementById(prevBtnId).className = this.neutralBtnStyle;
        }
    }
    onClickCSVType(){
        const previous_choice_type = this.state.choice_type;
        this.setState({choice:AddNewUserCsvHtml(this.onClickUploadCsv)});
        this.setState({choice_type:"csv"});
        let clickedBtnId = "adadmin_csv";
        document.getElementById(clickedBtnId).className = this.clickedBtnStyle;
        if(previous_choice_type!==null && previous_choice_type!=="csv"){
            let prevBtnId = "adadmin_"+previous_choice_type;
            document.getElementById(prevBtnId).className = this.neutralBtnStyle;
        }
    }
    async onClickAddUser(email_id, type){
        const email = document.getElementById(email_id).value;
        const userid = Cookies.get('userid',null);
        //console.log("add new user{userid:"+userid+" email:"+email+" role:"+type+"}");
        await fetch(resources.proxy("/admin"),{
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({"email":email,"role":getRole(type),"userid":userid})
        }).then(r=>r.text()).then(d=>this.setState({server_msg:JSON.parse(d)})).catch(e=>console.log(e));
        const server_msg = this.state.server_msg;
        //console.log(JSON.stringify(server_msg));
        if(typeof server_msg.username !== "undefined"){
            document.getElementById("admin_show_username").value = server_msg.username;
            document.getElementById("admin_show_password").value = server_msg.password;
        }
    }
    async onClickUploadCsv(file_id){
        const file = document.getElementById(file_id).files[0];
        const tobase64 = new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
        const file_base64 = (await tobase64);
        const userid = Cookies.get('userid',null);
        await fetch(resources.proxy("/admin"),{
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({"userid":userid,"file":file_base64,"file_type":"csv"})
        }).then(r=>r.text()).then(d=>this.setState({server_msg:d})).catch(e=>console.log(e));
    }
    render() {
        const choice = this.state.choice;
        const server_msg = this.state.server_msg;
        let error;
        if(server_msg!==null){
            if(typeof server_msg.username==="undefined")
                error = server_msg;
        }
        let buttons = [];
        this.types.map(type =>{
            buttons.push(<button className={this.neutralBtnStyle} onClick={this.onClickUserType.bind(this,type)} id={"adadmin_"+type}>{type}</button>);
        })
        return <React.Fragment>
            {buttons}
            <button className={this.neutralBtnStyle}  id={"adadmin_csv"} onClick={this.onClickCSVType} style={{display:"none"}}>Upload CSV</button>
            <p/>
            {error}
            {choice!==null?choice:''}

        </React.Fragment>
    }
}