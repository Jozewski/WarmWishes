import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { Link, } from 'react-router'
import { authLogin } from '../redux/authSlice'
import clients from '../assets/images/Clients.ico'
import  Spinner  from '../components/Spinner'


const Login = () => {
  const [ loginForm, setLoginForm ] = useState({ email: "", password: "" })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const  { loading, isLoggedIn, user } = useSelector((state) => state.auth)

  useEffect(() => {
    console.log("useEffect", isLoggedIn)
    if (isLoggedIn && user.token) {
      // sessionStorage.setItem("token", user.token) // Store token
      navigate("/dashboard") // Navigate to dashboard
    }
 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])


  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("handleSubmit")
    // Validation
    if (loginForm.email === "" || loginForm.password === "") {
      // Show error message/styling
      console.log("form error")
    } 
    else {
      dispatch(authLogin({...loginForm}))   
    }   
  }
    return (     
          <>          
            <div className="flex min-h-full flex-1 flex-col justify-center bg-slate-500 dark:bg-slate-500 px-6 py-16 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="ml-8"
                src={clients} 
                  alt="Warm Wishes"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-gray-900 ">
                  Sign in to your account
                </h2>
              </div>
      
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-900">
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value })}
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="block w-full rounded-md bg-white dark:bg-white px-3 py-1.5 text-base text-gray-900 dark:text-gray-900  outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
      
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900 dark:text-gray-900">
                        Password
                      </label>
                      
                    </div>
                    <div className="mt-2">
                      <input
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value })}
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 dark:text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>
      
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign in
                    </button>
                  </div>
                </form>

                {loading && <Spinner /> }
      
                <p className="mt-10 font-semibold text-center text-sm/6 text-gray-900 dark:text-gray-900">
                  Not a member?{' '}
                  <Link to="/" className="font-semibold text-indigo-900 dark:text-indigo-900 hover:text-indigo-900">
                    Join us today!
                  </Link>
                </p>
              </div>
            </div>
          </>
        )
      }
      
  

export default Login;
