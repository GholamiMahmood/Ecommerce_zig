// import { createSlice } from '@reduxjs/toolkit'

// const initialState = { 
//     loggedIn: false,
//     user: null, 
// };
// export const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers:{
//     setUser:(state,action)=>{
//         state.loggedIn=true;
//         state.user=action.payload;
//     },
//     logoutUser: (state) => {
//       state.loggedIn = false;
//       state.user = null;
//   },    
//   },
// });

// export const { setUser, logoutUser } = authSlice.actions;
// export default authSlice.reducer;

// authSlice.js (Redux slice for authentication)


import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loggedIn: localStorage.getItem('loggedIn') === 'true' , 
  user: localStorage.getItem('user') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.loggedIn = true;
      state.user = action.payload;
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('user', action.payload);
    },
    logoutUser: (state) => {
      state.loggedIn = false;
      state.user = '';
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('user');
    },
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
