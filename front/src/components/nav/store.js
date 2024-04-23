import { configureStore, createSlice } from '@reduxjs/toolkit'


//리덕스 state 만듬(쉽게 생각하면 전역변수)
let loginUser = createSlice({
  name: 'loginUser', //state 이름 
  initialState: {uid:'',uname:''}, //state 안에 초기화된 값

  reducers:{
    loginToken(state, action){
      //Navibar.js로부터 쿠키(토큰) 속 uid(sub),uname(nickName) 가져와서 loginUser state초기화
      let { uid, uname } = action.payload;
      state.uid = uid
      state.uname = uname
    },
  }
})


//장바구니 총액 담을 state, 금액만 필요로 하는 컴포넌트에서 바로 받을거
const totalPrice = createSlice({
  name: 'totalPrice',
  initialState: { total: 0 },
  reducers: {
    // 현재 총액에 새로운 값을 더하는 액션
    addToTotal(state, action) {
      const { value } = action.payload;
      state.total += value;
    },
    // 현재 총액에서 새로운 값을 빼는 액션
    subtractFromTotal(state, action) {
      const { value } = action.payload;
      state.total -= value;
    },
    // 총액을 특정 값으로 설정하는 액션
    setTotal(state, action) {
      const { value } = action.payload;
      state.total = value;
    },
  },
});


//loginUser state 초기화하는 함수(loginToken) export
export let { loginToken } = loginUser.actions
export const { addToTotal, subtractFromTotal, setTotal } = totalPrice.actions;

//만든 리덕스 state 등록해서 export. Main.js의 provider로 받을거고 Main 속 라우터들은 바로 값 받아 쓸 수 있음.
export default configureStore({
  reducer: {
      loginUser: loginUser.reducer,
      totalPrice: totalPrice.reducer
   }
}) 