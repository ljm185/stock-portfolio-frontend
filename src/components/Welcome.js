import React, {Component} from 'react'
import Register from './Register';
import Login from './Login';

class Welcome extends Component {
    constructor(props) {
        super(props);
    
        this.handleAuth = this.handleAuth.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleAuth(data) {
        this.props.handleLogin(data);
        this.props.history.push("/portfolio");
    }

    handleClick = () => {
        fetch("http://localhost:3000/logout", {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include"
        })
        .then(response => {
            this.props.handleLogout();
        })
        .catch(error => {
            console.log("logout error", error);
        });
        this.props.handleLogout();
    }

    render() {
        return (
            <div className="welcome">
                <h1>Welcome!</h1>
                <h1>Status: {this.props.isLoggedIn}</h1>
                <button onClick={() => this.handleClick()}>Log Out</button>
                <Register handleAuth={this.handleAuth}/>
                <Login handleAuth={this.handleAuth}/>
            </div>
        );
    }
}

export default Welcome;