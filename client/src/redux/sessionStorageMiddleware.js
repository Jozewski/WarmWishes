import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import { authLogin, logout } from "./authSlice"

export const listenerMiddleware = createListenerMiddleware()

// Login
listenerMiddleware.startListening({
  matcher: isAnyOf(authLogin.fulfilled),
  effect: (action, listenerApi) => {
    const token = listenerApi.getState().auth.user.token
    sessionStorage.setItem("token", token[token.length - 1])
  }
})

// Logout
listenerMiddleware.startListening({
  matcher: isAnyOf(logout.fulfilled),
  // eslint-disable-next-line no-unused-vars
  effect: (action, listenerApi) => {
    sessionStorage.removeItem("token")
  }
})
