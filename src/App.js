import React, { useState, useEffect } from "react";
import Select from "react-select";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";

export default function App() {
    return (
        <Router>
            <div className="min-h-screen bg-slate-700 pt-20">
                <Switch>
                    <Route path="/" exact component={Home} />
                </Switch>
            </div>
        </Router>
    );
}
