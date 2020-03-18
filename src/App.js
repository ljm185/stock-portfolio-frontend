import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';
import Welcome from './components/Welcome';
import NavBar from './components/NavBar';
import Portfolio from './components/Portfolio';
import Transactions from './components/Transactions';

class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: "nope",
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loginStatus() {
    fetch("http://localhost:3000/logged_in", {
      credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
      console.log("logged in?", data);
      if (this.state.isLoggedIn === "nope" && data.logged_in) {
        this.setState({
          user: data.user,
          isLoggedIn: "yep"
        });
      } else if (this.state.isLoggedIn === "yep" && !data.logged_in) {
        this.setState({
          user: {},
          isLoggedIn: "nope"
        });
      }
    })
    .catch(error => {
      console.log("login status error", error);
    });
  }

  componentDidMount() {
    this.loginStatus();
  }

  handleLogin(data) {
    this.setState({
      isLoggedIn: "yep",
      user: data.user
    });
  }

  handleLogout() {
    this.setState({
      isLoggedIn: "nope",
      user: {}
    });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path={"/"} render={props => <Welcome {...props} isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin} handleLogout={this.handleLogout}/>}/>
            <Route exact path={"/portfolio"} render={props => <Portfolio {...props} isLoggedIn={this.state.isLoggedIn}/>}/>
            <Route exact path={"/transactions"} render={props => <Transactions {...props} isLoggedIn={this.state.isLoggedIn}/>}/>
          </Switch>
        </BrowserRouter>
        {this.state.isLoggedIn === "yep" ? <NavBar /> : null}
        {/* <Register handleAuth={this.handleAuth}/> */}
        {/* <Portfolio /> */}
        {/* <Transactions /> */}
      </div>
    );
  }
}

export default App;
