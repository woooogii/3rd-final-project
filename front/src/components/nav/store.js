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

//loginUser state 초기화하는 함수(loginToken) export
export let { loginToken } = loginUser.actions


//만든 리덕스 state 등록해서 export. Main.js의 provider로 받을거고 Main 속 라우터들은 바로 값 받아 쓸 수 있음.
export default configureStore({
  reducer: {
      loginUser: loginUser.reducer
   }
}) 