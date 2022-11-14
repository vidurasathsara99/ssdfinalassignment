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
        this.getAuthorLayout=this.getAuthorLayout.bind(this);
        this.getPresenterLayout=this.getPresenterLayout.bind(this);
        this.getAttendeeLayout=this.getAttendeeLayout.bind(this);
        this.onClickUploadFile=this.onClickUploadFile.bind(this);
        //rest functions
        this.fetchPapersFromServer=this.fetchPapersFromServer.bind(this);
        this.fetchPaymentsFromServer=this.fetchPaymentsFromServer.bind(this);
        this.addPapersToServer=this.addPapersToServer.bind(this);
        this.addPaymentToServer=this.addPaymentToServer.bind(this);
    }
    componentDidMount() {
        const role = this.state.role;
        if(role===UserRoles.RESEARCHER){
            this.fetchPapersFromServer("author");
            this.fetchPaymentsFromServer("author");
        }else if(role===UserRoles.WORKSHOP_PRESENTER){
            this.fetchPapersFromServer("workshop");
        }else{
            this.fetchPaymentsFromServer("attendee");
        }
    }
    async fetchPapersFromServer(type){
        const userid = this.state.userid;
        await fetch(resources.proxy("/user/"+type+"/"+userid),{
            method:'get'
        }).then(r=>r.text()).then(d=>this.setState({papers:JSON.parse(d)})).catch(e=>console.log(e));
    }
    async fetchPaymentsFromServer(type){
        const userid = this.state.userid;
        await fetch(resources.proxy("/user/"+type+"/"+userid),{
            method:'get'
        }).then(r=>r.text()).then(d=>this.setState({payments:JSON.parse(d)})).catch(e=>console.log(e));
    }
    async addPapersToServer(role, bodyData){
        const userid = this.state.userid;
        let type=null;
        //console.log("body: "+JSON.stringify({bodyData}));
        if(role===UserRoles.RESEARCHER){
            type="author";
        }else if(role===UserRoles.WORKSHOP_PRESENTER){
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
    async addPaymentToServer(type){
        const userid = this.state.userid;
        await fetch(resources.proxy("/user/payment/"+type+"/"+userid),{
            method:'put'
        }).then(r=>r.text()).then(d=>this.setState({server_msg:JSON.parse(d)})).catch(e=>console.log(e));
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
        //console.log("userid:"+userid+" role:"+role + " topic:"+paper_topic+" authors:"+paper_authors+" file:"+paper_file.name);
        const body = {"userid":userid,"paper_topic":paper_topic,"paper_authors":paper_authors,"file_base64":file_base64};
        await this.addPapersToServer(role,body);
    }
    getAuthorLayout(error){
        const role = this.state.role;
        const papers = this.state.papers;
        return DocumentsHtml("Conference Paper",role,papers,this.onClickUploadFile,error);
    }
    getPresenterLayout(error){
        const role = this.state.role;
        const papers = this.state.papers;
        return DocumentsHtml("Workshop Paper",role,papers,this.onClickUploadFile,error);
    }
    getAttendeeLayout(error){
        const payment = this.state.payments;
        let content = [];
        const username = this.state.username;
        const userid = this.state.userid;
        if(payment.length>0){
            content.push(<p>Successfully Registered,<br/><b>Ticket ID: </b>{username}<b><br/>Ref ID:</b>{userid}</p>)
        }else{
            let paymentLink = "/user/payment/"+userid+"."+"ATTENDEE";
            content.push(<button className={"btn btn-outline-success"} onClick={()=>window.location.href=paymentLink}>Add Payment</button>);
        }
        return <React.Fragment>
            <h3><u>Please Follow the Rules Given Below!</u></h3>

            <h5> *All the attendees should be registered and should pay before attending*</h5>

            <ul>
                <li>Dress Code</li>
                <ul>
                    <li>Female - White blouse with a black skirt or white saree</li>
                    <li>Male - White shirt with a black trouser</li>

                </ul>
                <li>Be seated half an hour before the beginning of the conferrence.</li>
                <li>Get a book or a paper to write down important points.</li>
                <li>AVOID getting any kind of foods to the conferrence hall.</li>
                <li>AVOID distractions(Be kind enough to silence your phone while you are in the conferrence).</li>


            </ul>
            <h5>Conference Attendee Registration</h5>
            {content}


        </React.Fragment>;
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
        if(role===UserRoles.RESEARCHER){
            return this.getAuthorLayout(error);
        }
        if(role===UserRoles.WORKSHOP_PRESENTER){
            return this.getPresenterLayout(error);
        }else{
            return this.getAttendeeLayout(error);
        }

    }
}