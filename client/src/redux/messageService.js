import axios from 'axios'

const messageService = {
  messageCreate: async (messageData) => {
    return await axios.post(
      `${import.meta.env.VITE_NODE_SERVER_URL}/messages`,
      messageData
    )
  },
  messageGetMany: async () => {
    return await axios.get(
      `${import.meta.env.VITE_NODE_SERVER_URL}/messages`
    )
  },
  messageGetByProject: async (projectId) => {
    return await axios.get(
      `${import.meta.env.VITE_NODE_SERVER_URL}/messages/project/${projectId}`
    )
  }
}

export default messageService
