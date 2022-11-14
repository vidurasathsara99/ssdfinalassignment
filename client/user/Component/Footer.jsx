import React from "react";
export default function Footer(){
    return <div style={{position:"relative",bottom:"0px",backgroundColor: "rgba(0, 0, 0, 0.05)", borderRadius:"10px", width:"100%",left:"-3px"}}>
        <div className="text-center p-3 mb-1">
            <button onClick={()=>window.location.href="#"} style={{position:"relative"}} className={"btn btn-outline-success"}>UP</button> © 2022 Sri Lanka Institute of Information Technology,All Rights Reserved
        </div>
    </div>;
}