import { configureStore } from '@reduxjs/toolkit'
import authReducer from './redux/authSlice'
import projectReducer from './redux/projectsSlice'
import builderReducer from './redux/builderSlice'
import userReducer from './redux/userSlice'
import contactReducer from './redux/contactsSlice'
import dataSetReducer from './redux/DataSetSlice'
import messagesReducer from './redux/messagesSlice'
import { listenerMiddleware } from './redux/sessionStorageMiddleware'

const preloadedState = () => {
  if (sessionStorage.getItem("token") !== null) {
    return {
      auth: {
        loading: false,
        isLoggedIn: false,
        user: {
          firstName: "",
          lastName: "",
          email: "",
          roles: [],
          token: sessionStorage.getItem("token")
        }
      }
    }
  }
  return undefined
}


export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    builder: builderReducer,
    user: userReducer,
    contacts: contactReducer,
    datasets: dataSetReducer,
    messages: messagesReducer
  },
  preloadedState: preloadedState(),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(listenerMiddleware.middleware)

})
