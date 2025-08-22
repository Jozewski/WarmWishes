import { Navigate, Outlet } from 'react-router'
import { useSelector } from 'react-redux'


const PrivateRoute = () => {
  const { loading, isLoggedIn } = useSelector(state => state.auth)
  // const dispatch = useDispatch()

  const token = sessionStorage.getItem("token")
  // if (token) {
  //   const checkToken = async () => {
  //     const loginToken = token.split(",")[0]
  //     // const getToken = await authService.checkLogin(loginToken)
  //     dispatch(checkLogin(loginToken))
  //     // console.log("getToken", getToken)
  //   }
  //   checkToken()
  // }

  // If auth is pending and state is loading
  if (loading) {
    return <div>Loading ...</div>
  }

  // If user is logged
  if (token || isLoggedIn) {
    return <Outlet />
  }
  // If user is not logged in, navigate to login
  else {
    return <Navigate to="/login" />
  }
}

export default PrivateRoute


