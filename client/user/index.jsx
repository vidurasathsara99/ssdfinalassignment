import React from "react";
import {render} from "react-dom";
import "../shared/assets/css/home-page-design.css";
{/* main content */}
import App from "./App";
render(<App/>, document.getElementById('content'));

{/* navigation bar */}
import NavigationBar from "./Component/NavigationBar";
render(<NavigationBar/>,document.getElementById('navbarSupportedContent'));
