import React from "react";
import "url:https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css";
export default function NavigateItemHolder(props){
    const {path,name} = props;
    return <li className="nav-item mx-3">
        <a className="nav-link link-no-style" aria-current="page" href={path}>{name}</a>
    </li>;
}