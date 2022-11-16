import React, { useEffect, useState } from "react"
import Cookies from "js-cookie";
import nacl from "tweetnacl";
import util from "tweetnacl-util";

import resources from "../../resource.config";


export default class WorkerHome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: Cookies.get('username', null),
            userid: Cookies.get('userid', null),
            messageList: [],
            server_msg: null,
            message: '',
            messageSign: ''
        }
        this.messageOnChange = React.createRef();
        this.setMessage = this.setMessage.bind(this);
        this.saveMessage = this.saveMessage.bind(this);
        this.buff2hex = this.buff2hex.bind(this);
        this.getMessagesFromApi = this.getMessagesFromApi.bind(this);
        this.getFormattedDateTime=this.getFormattedDateTime.bind(this);
        //nacl.util = util;

    }

    async componentDidMount() {
        const userid = this.state.userid;
        if (userid !== undefined) {
            await this.getMessagesFromApi(userid);
        }
    }

    getMessagesFromApi = async (userid) => {
        if (userid == undefined) return;

        await fetch(resources.proxy(`/msg/list/${userid}`), {
            method: 'get'
        }).then(r => r.json()).then(d => {
            this.setState({messageList: d})
        })
    }

    setMessage = (event) => {
        this.setState({ message: event.target.value})
    }

    buff2hex = (buf) => {
        return Buffer.from(buf).toString('hex');
    }

    saveMessage = async () => {
        const messageString = this.state.message;
        const useridString = this.state.userid;

        //live generate key pair for authentication
        const keyPair = nacl.sign.keyPair();
        const pubkey = keyPair.publicKey;
        const privkey = keyPair.secretKey;

        let msg = util.decodeUTF8(JSON.stringify({ "message": messageString, "userid": useridString }));
        let signature = nacl.sign(msg, privkey);
        //let verifiedMsg = nacl.sign.open(signature, pubkey);

        let postBody = { "pubkey": this.buff2hex(pubkey), "signedMessage": this.buff2hex(signature) }

        //console.log(postBody)

        await fetch(resources.proxy("/msg/new"), {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postBody)
        }).then(r => r.json()).then(d => console.log(d)).catch(e => console.log(e))

        await this.getMessagesFromApi(this.state.userid);
    }

    getFormattedDateTime = (dateTimeUtc) => {
        const dateObject = new Date(dateTimeUtc)
        return `${dateObject.toLocaleDateString()} ${dateObject.toLocaleTimeString()}`
    }

    render() {
        const messageList = [...this.state.messageList].reverse();

        return <React.Fragment>
            <div class="form-group" style={{ maxWidth: "50%" }}>
                <label>Enter Message</label>
                <textarea class="form-control" onChange={this.setMessage} value={this.state.message}/>
                <br />
                <button onClick={this.saveMessage} className="btn btn-success">Save Message</button>
            </div>
            <br/>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Message Created Date Time</th><th scope="col">Message</th>
                    </tr>
                </thead>
                <tbody>
                        {messageList.map(message=>{
                            return <tr>
                                <td>{this.getFormattedDateTime(message.createDate)}</td>
                                <td>{message.message}</td>
                            </tr>
                        })}
                    </tbody>
            </table>
        </React.Fragment>
    }
}