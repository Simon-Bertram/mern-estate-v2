import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  isLoading: false,
  error: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isLoading = true
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload
      state.isLoading = false
      state.error = null
    },
    signInFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
    },
  },
})

export const { signInStart, signInSuccess, signInFailure, logout } =
  userSlice.actions

export default userSlice.reducer
