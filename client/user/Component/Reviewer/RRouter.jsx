import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
//components
import ReviewWorkshops from "./ReviewWorkshops";
export default () => {
    return <Router>
        <Switch>
            <Route exact path={"/reviewer"}>
                <ReviewWorkshops/>
            </Route>
        </Switch>
    </Router>;
}