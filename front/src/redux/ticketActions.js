import axios from 'axios';
import {
  UPDATE_TICKET_STATUS_SUCCESS,
  UPDATE_TICKET_STATUS_FAILURE,
} from './ticketTypes'; // ticketTypes로 경로 수정

export const updateTicketStatusSuccess = (ticketStatus) => ({
  type: UPDATE_TICKET_STATUS_SUCCESS,
  payload: ticketStatus,
});

export const updateTicketStatusFailure = (error) => ({
  type: UPDATE_TICKET_STATUS_FAILURE,
  payload: error,
});

export const updateTicketStatus = (uid) => {
  return (dispatch) => {
    return axios.get(`http://localhost:4000/pedal/myTicketList?uid=${uid}`)
      .then(response => {
        dispatch(updateTicketStatusSuccess(response.data));
      })
      .catch(error => {
        dispatch(updateTicketStatusFailure(error));
      });
  };
};
