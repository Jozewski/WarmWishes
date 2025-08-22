import axios from 'axios'

const userService = {
  userList: async () => {
    return await axios.get(
      `${import.meta.env.VITE_NODE_SERVER_URL}/users/list`
      // {} // token?!?!
    )
  }
}

export default userService
