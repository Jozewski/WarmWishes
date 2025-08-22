import axios from 'axios'

const authService = {
  authLogin: async (email, password) => {
    console.log(email, password)
    return await axios.post(
      `${import.meta.env.VITE_NODE_SERVER_URL}/users/login`,
      { email, password }
      // {} // token?!?!
    )
  },
  checkLogin: async (token) => {
    return await axios.get(
      `${import.meta.env.VITE_NODE_SERVER_URL}/users/me/${token}`
      // {} // token?!?!
    )
  },
  logout: async (token) => {
    return await axios.get(
      `${import.meta.env.VITE_NODE_SERVER_URL}/users/logout/${token}`
      // {} // token?!?!
    )
  }
}

export default authService