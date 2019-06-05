import React from "react"
import Flatpickr from "react-flatpickr"
import {connect} from 'react-redux'

/**
 * Composant BeneficiaryForm
 * @Props {Int} beneficiaryNumber 
 * @Props {index} The index of the Beneficiary associated object in the global store
 */
class BeneficiaryForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName:"",
            lastName:"",
            birthDate:new Date(),
            country:"",
            reduction:false
        }
    }

    onFormChanged = async (field, value) => {
        switch(field) {
            case "firstName":
                this.setState({firstName:value}, () => {
                    this._updateStore()
                })
            break;
            case "lastName":
                this.setState({lastName:value}, () => {
                    this._updateStore()
                })
            break;
            case "birthDate":
                this.setState({birthDate:value}, () => {
                    this._updateStore()
                })
            break;
            case "country":
                this.setState({country:value}, () => {
                    this._updateStore()
                })
            break;
            case "reduction":
                this.setState({reduction:!this.state.reduction}, () => {
                    this._updateStore()
                })
            break;
            default:
            return;
        }
    }

    _updateStore = () => {
        const action = {
            type:"UPDATE_TICKET",
            value:{
                index:this.props.index,
                value:this.state
            }
        }
        this.props.dispatch(action);
    }

    render () {
        return (
            <div className="contained">
                <h5>Beneficiary #{this.props.beneficiaryNumber}</h5>
                <div className="form-group">
                    <label className="form-control-label required">First name</label>
                    <input 
                        type="text" 
                        maxLength="35" 
                        className="form-control"
                        value={this.state.firstName}
                        onChange={(e) => this.onFormChanged("firstName", e.target.value) }/>
                </div>
                <div className="form-group">
                    <label className="form-control-label required">Last Name</label>
                    <input 
                        type="text" 
                        maxLength="35" 
                        className="form-control"
                        value={this.state.lastName}
                        onChange={(e) => this.onFormChanged("lastName", e.target.value) }/>
                </div>
                <div className="form-group">
                    <label className="form-control-label required">Birth date</label>
                    <Flatpickr data-enable-time
                        id="birthDateInput"
                        placeholder="We never forgot any birthday"
                        options={{dateFormat:"d/m/Y"}}
                        className="form-control"
                        value={this.state.birthDate}
                        onChange={(date) => this.onFormChanged("birthDate", date) } />
                    <small className="form-text text-muted">We'll never share your informations to thirds.</small>
                </div>
                <div className="form-group">
                    <label className="form-control-label required">Country</label>
                    <input 
                        type="text" 
                        maxLength="35" 
                        className="form-control"
                        value={this.state.country}
                        onChange={(e) => this.onFormChanged("country", e.target.value)}/>
                </div>
                <div className="form-group">
                    <div className="form-check">        
                        <input 
                            type="checkbox" 
                            className="form-check-input" 
                            checked={this.state.reduction}
                            onChange={(e) => this.onFormChanged("reduction", e.target.value)}/>
                        <label className="form-check-label">Reduction</label>
                    </div>
                    <small className="form-text text-muted">Upon presentation of justificative at the museum entrance</small>
                </div>
            </div>
        )
    }
}

export default connect(state => state) (BeneficiaryForm)
