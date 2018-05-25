import React from "react";
import { Route, Link } from "react-router-dom";

import Profile from "./containers/Profile";


const App = () => (
  <div>
    <Link to="/profile">Profile</Link>
    <br />
    <Route path="/profile" component={Profile} />
  </div>
);


App.defaultProps = {
};


App.propTypes = {
};


export default App;
