import React from "react";
import {connect} from 'react-redux';
import BeneficiaryForm from './BeneficiaryForm';
import NoBeneficiary from './NoBeneficiary';
import ErrorsModal from './ErrorsModal';

class SecondStep extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            birthDate : new Date(),
            showErrors:false,
            errors:[]
        }
    }

    onNextStepPress = () => {
        if(this._checkTicketsData()) {
            this.props.nextStep();
        }
    }

    onResetPress = () => {
        window.location.replace('/ticketing');
    }

    onModalClose = () => {
        this.setState({showErrors:false})
    }

    _checkTicketsData = () => {
        /**
         * Protocole de check
         * 1) Je regarde que j'ai bien que tickets.length === bookingInfo.visitorsNumber
         * 2) Si c'est ok je vérifie pour chaque objet que chacun des champs est cohérent
         * 3) Si tout ok, return true. Sinon, return false
         */
        let aTickets = this.props.tickets,
            oBookingInfo = this.props.bookingInfo,
            aErrors = [];
        
        if(aTickets.length !== parseInt(oBookingInfo.visitorsNumber, 10)) {
            aErrors.push("You have " + oBookingInfo.visitorsNumber + " visitors but you only provided " + aTickets.length + " tickets");
        }

        for(var i = 0; i < aTickets.length ; i++) {
            let oTicket = aTickets[i];
            if(!oTicket.firstName || oTicket.firstName === "") {
                aErrors.push("Beneficiary #" + (i+1) + ": Each visitor must have a first name");
            }
            if(!oTicket.lastName || oTicket.lastName === "") {
                aErrors.push("Beneficiary #" + (i+1) + ": Each visitor must have a last name");
            }
            if(!oTicket.birthDate) {
                aErrors.push("Beneficiary #" + (i+1) + ": Each visitor must have a birth date");
            }
            if(!oTicket.country || oTicket.country === "") {
                aErrors.push("Beneficiary #" + (i+1) + ": Each visitor must have a country");
            }
            if(oTicket.reduction === undefined) {
                aErrors.push("Beneficiary #" + (i+1) + ": For each visitor, please tell us if they are eligible for reduced price.");
            }
        }

        if(aErrors.length > 0) {
            this.setState({errors:aErrors, showErrors:true})
            return false;
        } else {
            return true;
        }
        
    }

    render () {
        let iVisitorsNumber = this.props.bookingInfo.visitorsNumber ? parseInt(this.props.bookingInfo.visitorsNumber, 10) : 0;
        return (
            <div className="step">
                <h2>{iVisitorsNumber && iVisitorsNumber > 1 ? "Beneficiaries" : "Beneficiary"}</h2>
                {iVisitorsNumber > 0 ?
                    [...Array(iVisitorsNumber)].map((e, i) => <BeneficiaryForm key={i} beneficiaryNumber={i + 1} index={i} />)
                    : <NoBeneficiary goToPrevious={this.props.previousStep}/>}
                <div className="form-group">
                    <button className="btn btn-primary" style={{width:"100%", marginBottom:10}} onClick={this.onNextStepPress}>Recap</button>
                    <button className="btn btn-secondary" style={{width:"100%"}} onClick={this.onResetPress}>Reset order</button>
                </div>
                <ErrorsModal show={this.state.showErrors} onClose={this.onModalClose} errors={this.state.errors}/>
            </div>
        )
    }
}

export default connect(state => state) (SecondStep);