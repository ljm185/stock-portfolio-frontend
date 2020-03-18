import React, {Component} from 'react';
import PurchaseForm from './PurchaseForm';

class Portfolio extends Component {
    constructor(props) {
        super(props);

        // this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    }

    // handleSuccessfulAuth(data) {
    //     this.props.history.push("/dashboard");
    // }

    render() {
        return (
            <div className="portfolio">
                <h1>Portfolio</h1>
                <h1>Status: {this.props.isLoggedIn}</h1>
            </div>
        );
    }
}

export default Portfolio;