import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/action-types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

// components
import Navbar from "./components/layout/navbar";
import themeObject from "./util/theme";
import AuthRoute from "./util/authRoute";

// pages
import Home from "./pages/home";
import Leaderboard from "./pages/leaderboard";
import Login from "./pages/login";
import Signup from "./pages/signup";
import User from "./pages/user";

import axios from "axios";

// custom theme
const theme = createMuiTheme(themeObject);

// set default baseURL
axios.defaults.baseURL =
  "https://us-central1-would-you-rather-app-c5895.cloudfunctions.net/api";

// @ check session user has token
// @ set headers auth prop to token
// @ if session experired sign user out
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

// @ if no user token allow reads
// @ if user token allow reads, writes and updates

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute exact path="/login" component={Login} />
                <AuthRoute exact path="/signup" component={Signup} />
                <Route exact path="/users/:userId" component={User} />
                <Route
                  exact
                  path="/users/:userId/question/:questionId"
                  component={User}
                />
                <Route exact path="/leaderboard" component={Leaderboard} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
