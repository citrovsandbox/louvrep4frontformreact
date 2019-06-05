import React from 'react';
import StepWizard from 'react-step-wizard';
import 'flatpickr/dist/themes/airbnb.css'
import { Provider } from 'react-redux';
import Store from './store/configureStore';
import DefaultStep from './components/DefaultStep';
import FirstStep from './components/FirstStep';
import SecondStep from './components/SecondStep';
import ThirdStep from './components/ThirdStep';
import FourthStep from './components/FourthStep';
import ThankYouStep from './components/ThankYouStep';

import {Elements, StripeProvider} from 'react-stripe-elements';

import './App.css';

class App extends React.Component {

  render () {
    return (
      <Provider store={Store}>
        <div className="App">
        <StripeProvider apiKey="pk_test_QkFyij1dZVbhBHCd0kDHka3j00kv9xS8RK">
          <StepWizard className="contained" isHashEnabled={true} isLazyMount={true}>
            <FirstStep />
            <SecondStep />
            <ThirdStep />
              <Elements>
                <FourthStep />
              </Elements>
            <ThankYouStep />
          </StepWizard>
          </StripeProvider>
        </div>
      </Provider>
    );
  }
}

export default App;
