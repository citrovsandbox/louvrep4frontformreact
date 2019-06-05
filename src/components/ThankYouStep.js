import React from "react";
import { connect } from 'react-redux'

class ThankYouStep extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render () {
        return (
            <div className="step">
                <h2 className="step-title">Congratulations !</h2>
                <p style={{textAlign:"justify"}}>Your order has been approved ! An email has been sent to <b>{this.props.bookingInfo.orderMailing}</b> with all your tickets. The Louvre Museum wishes you a good visit.</p>
            </div>
        )
    }
}

export default connect(state => state ) (ThankYouStep);