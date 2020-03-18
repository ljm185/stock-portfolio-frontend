import React, {Component} from 'react'

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            passwordConfirmation: "",
            errors: ""
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
        fetch("http://localhost:3000/registrations", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password,
                    password_confirmation: this.state.passwordConfirmation
                }
            }),
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.status === "created") {
                this.props.handleAuth(data);
            }
        })
        .catch(error => {
            console.log("registration error", error);
        });
        e.preventDefault();
        console.log("form submitted");
    }

    render() {
        return (
            <div className="register">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} required/>
                    <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required/>
                    <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required/>
                    <input type="password" name="passwordConfirmation" placeholder="Confirm password" value={this.state.passwordConfirmation} onChange={this.handleChange} required/>
                    <input type="submit" value="Register" />
                </form>
            </div>
        );
    }
}

export default Register;