import React from "react";
import {Elements} from 'react-stripe-elements';
import {connect} from 'react-redux';

import PayForm from '../components/PayForm';

class FourthStep extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading:false
        }
    }

    onPreviousStepPress = () => {
        // this.props.previousStep();
    }

    onPayPress = () => {
        console.log(this.props);
        // this.props.nextStep();
    }

    onNextStep = () => {
        this.props.nextStep()
    }

    render () {
        return (
        <div className="step">
            <h2 className="step-title">Payment</h2>
            <div className="alert alert-info" role="alert">
            You are about to pay an amount of <b>{this.props.bookingPrice} €</b>
            </div>
            <div className="contained">
                <Elements>
                    <PayForm bookingRef={this.props.bookingReference}/>
                </Elements>
            </div>
        </div>
        )
    }
    
}

export default connect(state => state) (FourthStep);