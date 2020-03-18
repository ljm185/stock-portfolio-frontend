import React, {Component} from 'react'

class Transactions extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="transactions">
                <h1>Transactions</h1>
                <h1>Status: {this.props.isLoggedIn}</h1>
            </div>
        );
    }
}

export default Transactions;