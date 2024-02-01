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
    updateUserStart: (state) => {
      state.isLoading = true
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload
      state.isLoading = false
      state.error = null
    },
    updateUserFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    deleteUserStart: (state) => {
      state.isLoading = true
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null
      state.isLoading = false
      state.user = null
    },
    deleteUserFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    signoutUserStart: (state) => {
      state.isLoading = true
    },
    signoutUserSuccess: (state) => {
      state.currentUser = null
      state.isLoading = false
      state.user = null
    },
    signoutUserFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  logout,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutUserStart,
  signoutUserSuccess,
  signoutUserFailure,
} = userSlice.actions

export default userSlice.reducer
