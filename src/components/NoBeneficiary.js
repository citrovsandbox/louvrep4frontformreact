import React from "react";

class NoBeneficiary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    onGoToPreviousStepPress = (e) => {
        e.preventDefault();
        this.props.goToPrevious();
    }

    render () {
        console.log(this.props);
        return (
            <div className="contained">
                <h4>Oops!</h4>
                <p>You have no beneficiary. Why not start by the beginning ?</p>
                <p><a href="#step2" onClick={this.onGoToPreviousStepPress}>Go to the first step</a></p>
            </div>
        )
    }
}

export default NoBeneficiary;