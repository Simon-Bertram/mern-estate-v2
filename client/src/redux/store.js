import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"

const store = configureStore({
  reducer: { user: userReducer },
  // Todo: Remove this before production
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
