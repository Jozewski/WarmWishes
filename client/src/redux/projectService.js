import axios from 'axios'

const projectService = {
  projectCreate: async (createdProject) => {
    return await axios.post(
      `${import.meta.env.VITE_NODE_SERVER_URL}/projects`,
      createdProject
    )
  },
  projectUpdate: async (projectId, project) => {
    return await axios.put(
      `${import.meta.env.VITE_NODE_SERVER_URL}/projects/${projectId}`,
      project
    )
  },
  projectGetMany: async (email) => {
      return await axios.get(
      `${import.meta.env.VITE_NODE_SERVER_URL}/projects/${email}`
    )
  },
  projectGetOne: async (projectId) => {
    return await axios.get(
      `${import.meta.env.VITE_NODE_SERVER_URL}/projects/detail/${projectId}`
    )
  },
  projectTaskCreate: async (projectId, task) => {
    return await axios.post(
      `${import.meta.env.VITE_NODE_SERVER_URL}/projects/${projectId}/tasks`,
      task
    )
  },
  projectTaskUpdate: async (projectId, task) => {
    return await axios.put(
      `${import.meta.env.VITE_NODE_SERVER_URL}/projects/${projectId}/tasks`,
      task
    )
  },
  projectTaskDelete: async (projectId, taskId) => {
    return await axios.delete(
      `${import.meta.env.VITE_NODE_SERVER_URL}/projects/${projectId}/tasks/${taskId}`,
    )
  },
  projectDonationUpdate: async (projectId, donationData) => {
    return await axios.put(
      `${import.meta.env.VITE_NODE_SERVER_URL}/projects/${projectId}/donations`,
      donationData
    )
  }

}

export default projectService
