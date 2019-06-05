import React from "react";
import { Dots } from 'react-activity';
import {connect} from 'react-redux';
import {CardElement, injectStripe} from 'react-stripe-elements';
import ErrorModal from './ErrorModal';
import SuccessModal from './SuccessModal';
import Hermes from '../http/Hermes';
/**
 * Pay data :
 * Test data
 * Creditcard : 4242424242424242
 * Date : 03/24
 * Crypto : 123
 * ZIP Code : 95646
 */
class PayForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading:false,
            showErrorModal:false,
            showSuccessModal:false,
            errorText:""
        }
    }

    onCloseErrorModal = () => {
        this.setState({showErrorModal:false});
    }

    onPayPress = () => {
        console.log(this.props);
        console.log("Je suis la bookingRef");
        console.log(this.props.bookingRef);
        this.setState({isLoading:true})
        this.props.stripe.createToken().then(res => {
            console.log(res);
            Hermes.post('/pay', {token:res.token.id, bookingRef:this.props.bookingRef}).then(res => {
                console.log("Le paiement a été effectué !");
                console.log(res);
                if(res.status === 200) {
                    this.setState({showSuccessModal:true});
                } else {
                    this.setState({showErrorModal:true, errorText:"An error occured during the payment. Please retry."});
                }
                this.setState({isLoading:false})
            }).catch(err => {
                console.warn("Une erreur est survenue durant le paiement");
                console.error(err);
                this.setState({showErrorModal:true, errorText:"An error occured during the payment. Please try with another card."});
                this.setState({isLoading:false})
            })
        }).catch(error => {
            console.warn("Une erreur est survenue durant l'obtention du jeton");
            console.error(error);
            this.setState({showErrorModal:true, errorText:"You didn't fill all the fields. Please verify that all the fields are correctly filled."});
            this.setState({isLoading:false})
        });
    }

    render () {
        return (
            
            <div className="checkout">
                <CardElement />
                <small>We will never store our credit cards credentials and all your payment is secured by <a target="_blank" href="https://stripe.com/">Stripe Inc®</a>.</small>
                <button id="payButton" style={{width:"100%"}}className="btn btn-primary" onClick={this.onPayPress}>{this.state.isLoading ? <Dots color="white" /> : "Pay"}</button>
                <SuccessModal show={this.state.showSuccessModal} />
                <ErrorModal show={this.state.showErrorModal} errorText={this.state.errorText} onClose={this.onCloseErrorModal}/>
            </div>
        )
    }
}

export default connect(state => state) (injectStripe(PayForm));