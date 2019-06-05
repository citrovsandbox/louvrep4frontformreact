import { createStore } from 'redux';
import globalReducer from './reducers/globalReducer';

export default createStore(globalReducer);