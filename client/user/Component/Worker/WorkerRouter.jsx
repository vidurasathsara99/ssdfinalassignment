import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
//components
import WorkerHome  from "./WorkerHome";
export default () => {
    return <Router>
        <Switch>
            <Route exact path={"/worker"}>
                <WorkerHome/>
            </Route>
        </Switch>
    </Router>;
}