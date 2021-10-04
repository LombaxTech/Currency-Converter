import React, { useState, useEffect } from "react";
import "./App.scss";
import Select from "react-select";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
            </Switch>
        </Router>
    );
}
