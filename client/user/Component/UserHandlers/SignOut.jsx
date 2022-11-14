import React from "react";
import Cookies from 'js-cookie';
export default class SignOut extends React.Component{
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        Cookies.remove('username');
        Cookies.remove('userid');
        window.location.href="/";
    }
    render() {
        return false;
    }
}