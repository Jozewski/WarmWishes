import axios from 'axios'

const contactService = {
  contactCreate: async (contact) => {
    return await axios.post(
      `${import.meta.env.VITE_NODE_SERVER_URL}/contacts`,
      contact
    )
  },
  contactGetMany: async (email) => {
    return await axios.get(
      `${import.meta.env.VITE_NODE_SERVER_URL}/contacts/${email}`
    )
  }
}

export default contactService