import React, {Component} from 'react'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            loginErrors: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        fetch("http://localhost:3000/sessions", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    email: this.state.email,
                    password: this.state.password
                }
            }),
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            console.log("data from login", data);
            if (data.logged_in) {
                this.props.handleAuth(data);
            }
        })
        .catch(error => {
            console.log("login error", error);
        });
        e.preventDefault();
        console.log("form submitted");
    }

    render() {
        return (
            <div className="register">
                <form onSubmit={this.handleSubmit}>
                    <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required/>
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
                    <input type="submit" value="Login" />
                </form>
            </div>
        );
    }
}

export default Login;