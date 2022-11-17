import React from "react";
import Cookies from "js-cookie";
import DocumentsHtml from "./layouts/DocumentsHtml";
import {getUsernameType} from "../../api/get-username-type";
import {getRole, UserRoles} from "../../api/roles";
import resources from "../../resource.config";
export default class UDashboard extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            username:Cookies.get('username',null),
            userid:Cookies.get('userid',null),
            role:getUsernameType(Cookies.get('username',null)),
            papers:[],
            payments:[],
            server_msg:null
        }
        //functions
        this.getManagerLayout=this.getManagerLayout.bind(this);
        this.getWorkerLayout=this.getWorkerLayout.bind(this);
        this.onClickUploadFile=this.onClickUploadFile.bind(this);
        //rest functions
        this.fetchPapersFromServer=this.fetchPapersFromServer.bind(this);
       
        this.addPapersToServer=this.addPapersToServer.bind(this);

    }
    componentDidMount() {
        const role = this.state.role;
        if(role===UserRoles.MANAGER){
            this.fetchPapersFromServer("manager");
        }else if(role===UserRoles.WORKER){
            this.fetchPapersFromServer("worker");
     
        }
    }
    async fetchPapersFromServer(type){
        const userid = this.state.userid;
        await fetch(resources.proxy("/user/"+type+"/"+userid),{
            method:'get'
        }).then(r=>r.text()).then(d=>this.setState({papers:JSON.parse(d)})).catch(e=>console.log(e));
    }
    
    async addPapersToServer(role, bodyData){
        const userid = this.state.userid;
        let type=null;
        //console.log("body: "+JSON.stringify({bodyData}));
        if(role===UserRoles.MANAGER){
            type="author";
        }else if(role===UserRoles.WORKER){
            type="workshop";
        }
        await fetch(resources.proxy("/user/"+type+"/"+userid),{
            method:'put',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({bodyData})
        }).then(r=>r.text()).then(d=>this.setState({server_msg:d})).catch(e=>console.log(e));
        const server_msg = this.state.server_msg;
        if(server_msg==="success"){
            await this.fetchPapersFromServer(type);
        }
    }
    async onClickUploadFile(role){
        const userid = this.state.userid;
        const paper_topic = document.getElementById("paper_topic").value;
        const paper_authors = document.getElementById("paper_authors").value;
        const paper_file = document.getElementById("paper_file").files[0];
        if(typeof paper_file === "undefined"){
            this.setState({server_msg:"Please choose a file to upload!"});
            return;
        }
        const tobase64 = new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(paper_file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
        const file_base64 = (await tobase64);
        const body = {"userid":userid,"paper_topic":paper_topic,"paper_authors":paper_authors,"file_base64":file_base64};
        await this.addPapersToServer(role,body);
    }
    getManagerLayout(error){
        const role = this.state.role;
        const papers = this.state.papers;
        return DocumentsHtml("Upload Paper",role,papers,this.onClickUploadFile,error);
    }
    getWorkerLayout(error){
        const role = this.state.role;
        const papers = this.state.papers;
        return DocumentsHtml("Send Message",role,papers,this.onClickUploadFile,error);
    }

    render() {

        const role = this.state.role;
        const server_msg = this.state.server_msg;


        let error = null;
        if(server_msg!==null){
            if(server_msg!=="success")
                error = server_msg;
            console.log(server_msg);
        }
        //console.log("Role:"+role);
        if(role===UserRoles.MANAGER){
            return this.getManagerLayout(error);
        }
        if(role===UserRoles.WORKER){
            return this.getWorkerLayout(error);
        }

    }
}