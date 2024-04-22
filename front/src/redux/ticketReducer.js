import {
    UPDATE_TICKET_STATUS_SUCCESS,
    UPDATE_TICKET_STATUS_FAILURE,
  } from './ticketTypes'; // ticketTypes로 경로 수정
  
const initialState = {
  ticketStatus: [],
  error: null,
};

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TICKET_STATUS_SUCCESS:
      return {
        ...state,
        ticketStatus: action.payload,
        error: null,
      };
    case UPDATE_TICKET_STATUS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ticketReducer;
