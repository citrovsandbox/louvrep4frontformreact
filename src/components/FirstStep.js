import React from 'react'
import {connect} from 'react-redux'
import EmailValidator from 'email-validator';

import Flatpickr from 'react-flatpickr';
import ErrorsModal from './ErrorsModal';
import { Dots } from 'react-activity';
import Hermes from '../http/Hermes';

class FirstStep extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            date:new Date(),
            visitorsNumber:0,
            ticketType:"half",
            orderMailing:"",
            orderMailingConfirm:"",
            showErrors:false,
            errors:[],
            isLoading:false
        };
    }

    onNextStepPress = () => {
        this.setState({isLoading:true});
        let oBooking = {
            date:this.state.date,
            visitorsNumber:(this.state.visitorsNumber !== 0 && this.state.visitorsNumber !== NaN && this.state.visitorsNumber !== "" && this.state.visitorsNumber > 0) ? parseInt(this.state.visitorsNumber, 10) : false,
            ticketType:this.state.ticketType,
            orderMailing:this.state.orderMailing,
            orderMailingConfirm:this.state.orderMailingConfirm
        }
        if(this._checkBooking(oBooking)) {
            // On vérifie qu'il reste des places à la date donnée
            Hermes.post('/dateisavaiable', {date:oBooking.date}).then(res => {
                let bDateIsEnabled = res.data.data.dateIsEnabled;
                if(bDateIsEnabled) {
                    this._registerBookingInfo(oBooking)
                    this._registerTickets(oBooking.visitorsNumber);
                    this.props.nextStep()
                } else {
                    this.dateIsntAvailableAnymore();
                }
                this.setState({isLoading:false});
            }).catch(err => {
                this.setState({isLoading:false});
                console.error("Erreur survenue dans POST /dateisavailable");
                console.error(err);
            });
        } else {
            this.setState({isLoading:false});
        }
    }

    dateIsntAvailableAnymore = () => {
        alert("Sorry. There is no places anymore for that date. Please chose another one. Thank you.")
    }

    onErrorsModalClose = () => {
        this.setState({showErrors:false})
    }

    isHalfEnabled = () => {
        let ticketDate = new Date(this.state.date).getDate(),
            currentDate = new Date().getDate(),
            currentHours = new Date().getHours();
        
        if(ticketDate === currentDate && currentHours >= 11) {
            return false;
        } else {
            return true;
        }
    }

    _registerBookingInfo = (booking) => {
        const action = {
            type:'UPDATE_BOOKING_INFO',
            value:booking
        };
        this.props.dispatch(action);
    }

    _registerTickets = (visitorsNumber) => {
        const aTickets = [];
        for(let i = 0; i < visitorsNumber ; i++) {
            aTickets.push({});
        }
        const action = {
            type:'UPDATE_TICKETS',
            value:aTickets
        };
        this.props.dispatch(action);
    }

    _checkBooking = (oBooking) => {
        let aErrors = [];
        if(!this._ckeckBookingDate(oBooking.date)) {
            aErrors.push("Visit date is invalid");
        }
        if(oBooking.visitorsNumber <= 0) {
            aErrors.push("Visitors number is invalid");
        }
        if(oBooking.ticketType === "") {
            aErrors.push("Ticket type is invalid");
        }
        if(oBooking.orderMailing === "" || this._isEmailValid(oBooking.orderMailing) === false) {
            aErrors.push("Order email is invalid");
        }
        if(oBooking.orderMailingConfirm !== oBooking.orderMailing) {
            aErrors.push("You didn't type the same email address");
        }

        if(aErrors.length > 0) {
            this.setState({errors:aErrors, showErrors:true})
            return false;
        } else {
            return true;
        }
    }

    _ckeckBookingDate = (date) => {
        date = new Date(date)
        if(date.getDay() === 0 || date.getDay() === 2 || (date.getDate() === 1 && date.getMonth() === 4) || (date.getDate() === 1 && date.getMonth() === 10) || (date.getDate() === 25 && date.getMonth() === 11) || (date.getDate() === 1 && date.getMonth() === 0) || (date.getDate() === 11 && date.getMonth() === 10) || (date.getDate() === 14 && date.getMonth() === 6) || (date < new Date ()) && date.getDate() !== new Date().getDate()) {
            return false;
        } else {
            return true;
        }
    }

    _isEmailValid = (email) => {
        return EmailValidator.validate(email);
    } 

    render () {
        return (
            <div className="step">
                <h2>Booking</h2>
                <div className="form-group">
                    <label className="form-control-label required">Visit date</label>
                    <Flatpickr data-enable-time
                        id="visitDateInput"
                        disableMobile={true}
                        placeholder="Please select a date for your visit"
                        options={{dateFormat:"d/m/Y", enableTime:false, disable:[function (date) {return (date.getDay() === 0 || date.getDay() === 2 || (date.getDate() === 1 && date.getMonth() === 4) || (date.getDate() === 1 && date.getMonth() === 10) || (date.getDate() === 25 && date.getMonth() === 11) || (date.getDate() === 11 && date.getMonth() === 10) || (date.getDate() === 1 && date.getMonth() === 0) || (date.getDate() === 14 && date.getMonth() === 6) || (date < new Date(new Date().setDate(new Date().getDate()-1))));}]}}
                        className="form-control"
                        value={this.state.date}
                        onChange={date => {this.setState({date:new Date(date)}) }} />
                    <small className="form-text text-muted" style={{textAlign:"justify"}}>Booking not available on sundays. Closed on Tuesdays, the 1st of May, the 1st of November et le 25th of December.</small>
                </div>
                <div className="form-group">
                    <label className="form-control-label required">Number of visitors</label>
                    <input type="number" className="form-control"
                    value={this.state.visitorsNumber}
                    onChange={(e) => {this.setState({visitorsNumber:e.target.value})}}/>
                </div>
                <div className="form-group">
                    <label className="form-control-label required">Ticket type</label>
                    <select className="form-control"
                    value={this.state.ticketType}
                    onChange={e => this.setState({ticketType:e.target.value})}>
                        <option value="half" >Half-Day</option>
                        <option value="full" disabled={this.state.date.getDate() === new Date().getDate() && new Date().getHours() >= 14 ? true : false}>Full Day</option>
                    </select>
                    <small className="form-text text-muted" style={{textAlign:"justify"}}>The "Half-Day" ticket is only valid from 2pm. Note that you cannot afford a Full-Day ticket from 2pm.</small>
                </div>
                <div className="form-group">
                    <label className="form-control-label required">Mailing address of receipt for the ticket(s)</label>
                    <input type="email" className="form-control" value={this.state.orderMailing} required
                    onChange={e => this.setState({orderMailing:e.target.value})}/>
                </div>
                <div className="form-group">
                    <label className="form-control-label required">Confirm the email address</label>
                    <input type="email" className="form-control" required
                    onChange={e => this.setState({orderMailingConfirm:e.target.value})}/>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" style={{width:"100%", marginBottom:10}} onClick={this.onNextStepPress}>{this.state.isLoading ? <Dots color="white" /> : "Next"}</button>
                </div>
                <ErrorsModal show={this.state.showErrors} onClose={this.onErrorsModalClose} errors={this.state.errors}/>
            </div>
        )
    }
}

export default connect(state => state) (FirstStep);