import { createStore, combineReducers } from 'redux';
import ticketReducer from './ticketReducer';

const rootReducer = combineReducers({
  ticketStatus: ticketReducer,
});

const store = createStore(rootReducer);

const initialState = {
  ticketStatus: [] // ticketStatus를 빈 배열로 초기화
  // 다른 상태들도 여기에 포함될 수 있습니다.
};

export default store;
