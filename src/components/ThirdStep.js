import React from "react";
import { Dots } from 'react-activity';
import { connect } from "react-redux";
import Hermes from '../http/Hermes';

class ThirdStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPrice:0
        }
    }

    onResetPress = () => {
        window.location.replace('/ticketing');
    }

    onNextStepPress = () => {
        let oBody = {
            bookingInfo:this.props.bookingInfo,
            tickets:this.props.tickets
        };
        this.setState({isLoading:true});
        Hermes.post('/order', oBody).then((res) => {
            /**
             * Le serveur doit retourner a minima
             * Un code HTTP
             * Dans le body de la réponse : un code de référence + le prix calculé
             * 
             */
            if(res.status === 200 && res.data.code === 200) {
                let bookingRef = res.data.data.bookingReference;
                let totalPrice = res.data.data.totalPrice;
                console.log(bookingRef);
                console.log(totalPrice);
                this.updateReference(bookingRef);
                this.updateBookingPrice(totalPrice);
                this.props.nextStep();
            } else {

            }
            this.setState({isLoading:false})
        }).catch((err) => {
            console.error("An error happened during the POST");
            console.error(err);
            this.setState({isLoading:false})
        })
    }

    calcPrice = (ticket) => {
        let dBirthDate = new Date(ticket.birthDate);
        let age = this._calculateAge(dBirthDate);
        let reduction = ticket.reduction;
        let sBookingType = this.props.bookingInfo.ticketType;
        let price = 0;
        if(!isNaN(age) && (sBookingType === "half" || sBookingType === "full")) {
            if(age < 4) {
                return price;
            }

            if(age < 12) {
                if(sBookingType === "half") {
                    return 4;
                } else {
                    return 8;
                }
            }

            if(age < 60) {
                if(reduction) {
                    if(sBookingType === "half") {
                        return 5;
                    } else {
                        return 10;
                    }
                }
                if(sBookingType === "half") {
                    return 8;
                } else {
                    return 16;
                }
            }

            if(age >= 60) {
                if(reduction) {
                    if(sBookingType === "half") {
                        return 5;
                    } else {
                        return 10;
                    }
                }
                if(sBookingType === "half") {
                    return 6;
                } else {
                    return 12;
                }
            }
        } else {
            return 0;
        }
    }

    updateReference = (bookingReference) => {
        const action = {
            type:'UPDATE_BOOKING_REFERENCE',
            value:bookingReference
        };
        this.props.dispatch(action);
    }


    updateBookingPrice = (bookingPrice) => {
        const action = {
            type : 'UPDATE_BOOKING_PRICE',
            value:bookingPrice
        };
        this.props.dispatch(action);
    }

    _calculateAge = (dateOfBirth, dateToCalculate = new Date()) => {
        var calculateYear = dateToCalculate.getFullYear();
        var calculateMonth = dateToCalculate.getMonth();
        var calculateDay = dateToCalculate.getDate();
    
        var birthYear = dateOfBirth.getFullYear();
        var birthMonth = dateOfBirth.getMonth();
        var birthDay = dateOfBirth.getDate();
    
        var age = calculateYear - birthYear;
        var ageMonth = calculateMonth - birthMonth;
        var ageDay = calculateDay - birthDay;
    
        if (ageMonth < 0 || (ageMonth === 0 && ageDay < 0)) {
            age = parseInt(age) - 1;
        }
        return age;
    }

    componentWillMount () {
        let aTickets = this.props.tickets;
        let iTotalPrice = 0;

        for(var i =0; i < aTickets.length ; i++) {
            let oTicket = aTickets[i];
            let price = this.calcPrice(oTicket);
            iTotalPrice += price;
        }
        if(iTotalPrice !== this.state.totalPrice) {
            this.setState({totalPrice:iTotalPrice});
        }
    }

    componentWillUpdate () {
        let aTickets = this.props.tickets;
        let iTotalPrice = 0;

        for(var i =0; i < aTickets.length ; i++) {
            let oTicket = aTickets[i];
            let price = this.calcPrice(oTicket);
            iTotalPrice += price;
        }
        if(iTotalPrice !== this.state.totalPrice) {
            this.setState({totalPrice:iTotalPrice});
        }
    }

    render () {
        return (
        <div className="step">
            <h2 className="step-title">Recap</h2>
            <p>You will find here all the recap of your order. Please be sure everything is ok before paying.</p>
            <div className="contained">
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Identity</th>
                        <th scope="col" className="custom-mobile-hidden">Ticket type</th>
                        <th scope="col" className="custom-mobile-hidden">Reduced Price</th>
                        <th scope="col">Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.tickets.map((ticket, i) => <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{ticket.firstName} {ticket.lastName.toUpperCase()}</td>
                            <td className="custom-mobile-hidden">{this.props.bookingInfo.ticketType === "half" ? "Half day" : "Full day"}</td>
                            <td className="custom-mobile-hidden">{ticket.reduction ? "yes" : "no"}</td>
                            <td>{this.calcPrice(ticket) + " €"}</td>
                        </tr>
                        )}
                    </tbody>
                </table>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">Number of tickets</th>
                        <th scope="col">Total Price (VAT included)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>{this.props.tickets.length}</th>
                        <td>{this.state.totalPrice} €</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="form-group">
                <button className="btn btn-primary" style={{width:"100%", marginBottom:10}} onClick={this.onNextStepPress}>{this.state.isLoading ? <Dots color="white" /> : "Order"}</button>
                <button className="btn btn-secondary" style={{width:"100%"}} onClick={this.onResetPress}>Reset order</button>
            </div>
        </div>
        )
    }
}

export default connect(state => state) (ThirdStep)