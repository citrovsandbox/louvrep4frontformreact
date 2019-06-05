const initialState = {
    bookingInfo:{},
    tickets:[],
    orderInfo:{},
    bookingReference:'',
    bookingPrice:0
}

function globalReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'UPDATE_BOOKING_INFO':
        nextState = {
          ...state,
          bookingInfo:action.value
        };
    return nextState;
    case 'UPDATE_TICKETS':
        nextState = {
          ...state,
          tickets:action.value
        };
    return nextState;
    case 'UPDATE_ORDER_INFO':
        nextState = {
          ...state,
          orderInfo:action.value
        };
    return nextState;
    case 'UPDATE_BOOKING_REFERENCE':
        nextState = {
          ...state,
          bookingReference:action.value
        };
    return nextState;
    case 'UPDATE_BOOKING_PRICE':
        nextState = {
          ...state,
          bookingPrice:action.value
        };
    return nextState;
    case 'UPDATE_TICKET':
        let tickets = state.tickets;
        tickets[action.value.index] = action.value.value;
        
        nextState = {
          ...state,
          tickets:tickets
        }
        return nextState;
  default:
    return state
  }
}

export default globalReducer;