// import { useEffect } from 'react'
import { useSelector} from 'react-redux'
import DashboardPM from '../components/DashboardPM'
import DashboardCSO from '../components/DashboardCSO'
import DashboardHHH from '../components/DashboardHHH'
import DashboardIC from '../components/DashboardIC'
import DashboardLM from '../components/DashboardLM'


const Dashboard = () => {
const { user } = useSelector(state => state.auth)
console.log("user", user)
if (user.roles.includes("Project Manager")) {
  console.log("Project Manager")
}


  // useEffect(() => {
  //   const token = sessionStorage.getItem("token")
  //   if (token) {
  //     const checkToken = async () => {
  //       const loginToken = token.split(",")[0]
  //       const getToken = await axios.get(`${import.meta.env.VITE_NODE_SERVER_URL}/users/me/${loginToken}`)        
  //        console.log("getToken", getToken)
  //     }
  //     checkToken()
  
  //   }
  // }, [])



    return (
      <>

        {user.roles.includes("Project Manager") &&
          (<DashboardPM />)       
        }
        {user.roles.includes("Corporate Sponsor Outreach") &&
          (<DashboardCSO />)       
        }
        {user.roles.includes("Helping Hands Handler") &&
          (<DashboardHHH />)       
        }
        {user.roles.includes("Inventory and Control") &&
          (<DashboardIC />)       
        }
        {user.roles.includes("Local Missions") &&
          (<DashboardLM />)       
        }
      </>

    )
}

export default Dashboard;
