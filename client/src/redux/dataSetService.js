import axios from 'axios'

const dataSetService = {
 
  dataSetsGetMany: async () => {
    return await axios.get(
      `${import.meta.env.VITE_NODE_SERVER_URL}/dataset`
    )
  
  }
}

export default dataSetService 