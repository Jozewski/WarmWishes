import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import { authLogin, logout } from "./authSlice"

export const listenerMiddleware = createListenerMiddleware()

// Login
listenerMiddleware.startListening({
  matcher: isAnyOf(authLogin.fulfilled),
  effect: (action, listenerApi) => {
    console.log("listenerMiddleware authLogin.fulfilled effect")
    const token = listenerApi.getState().auth.user.token
    console.log(token, token[token.length - 1])
    sessionStorage.setItem("token", token[token.length - 1])
  }
})

// Logout
listenerMiddleware.startListening({
  matcher: isAnyOf(logout.fulfilled),
  // eslint-disable-next-line no-unused-vars
  effect: (action, listenerApi) => {
    console.log("listenerMiddleware logout.fulfilled effect")
    sessionStorage.removeItem("token")
  }
})
