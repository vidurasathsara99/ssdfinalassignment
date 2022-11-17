import React from "react";
export default function DocumentsHtml(type,role,documents,onClickUpload, error){
    let records = []
    documents.map(doc=>{
        let base64 = doc.file_base64.substring(doc.file_base64.indexOf(",")+1,doc.file_base64.length);
        let base64bin = atob(base64.replace(/\s/g,''));
        let base64binLength = base64bin.length;
        let buffer = new ArrayBuffer(base64binLength);
        let view = new Uint8Array(buffer);
        for (let i = 0; i < base64binLength; i++) {
            view[i] = base64bin.charCodeAt(i);
        }
        let docLinkBlob =  new Blob([view], {type: "application/pdf"});
        let link = window.URL.createObjectURL(docLinkBlob);

        let buttonPayment = <button className={"btn btn-success"} onClick={()=>{window.location.href="/user/payment/"+doc._id+"."+role}}>Add Payment</button>;
        let paymentOption = "";
        if(role!=="WORKER"){
            paymentOption = <td>{doc.payment==="pending"&&doc.status==="accept"?buttonPayment:doc.payment}</td>;;
        }
        records.push(<tr><td>{doc._id}</td><td><a href={link}>{doc.paper_topic}</a></td><td>{doc.paper_authors}</td></tr>);
        //<tr><td>1</td><td><a href="#">Paper</a></td><td>On-Review</td></tr>
    });
    return <React.Fragment>

        <h6>Upload file</h6>
        <div style={{display: "table-cell", width: "590px", border: "1px solid green", padding: "12px"}}>
            {error!==null?error:''}
            <p/>
            <label>Title&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input className={"w-75"} type="text" placeholder="Enter title" id={"paper_topic"}/>
            <p/>
            <label>Description&nbsp;</label>
            <input className={"w-75"} type="text" placeholder="Enter description" id={"paper_authors"}/>
            <p/>
            <input type="file" id={"paper_file"}/>
            <p/>
            <button className="btn btn-success" onClick={()=>onClickUpload(role)}>Upload</button>
        </div>
        <p/>
        <h6>Past Submissions</h6>
        <table className={"table"}>
            <thead><tr><th>Document ID</th><th>Title</th><th>Description</th></tr></thead>
            <tbody>
            {records}
            </tbody>
        </table>
    </React.Fragment>
}