/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Faq from './pages/Faq'
import Login from './pages/Login'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard  from './pages/Dashboard'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import ProjectTasks from './pages/ProjectTasks'
import ContactsInbox from './pages/ContactsInbox'
import Users from './pages/Users'
import ProjectCreateForm from './pages/ProjectCreateForm'
import NoMatch from './pages/NoMatch'
import { checkLogin } from './redux/authSlice'
import { dataSetGetMany } from "./redux/DataSetSlice";

import './App.css'

function App() {
 
  const dispatch = useDispatch();

  const { datasets } = useSelector((state) => state.datasets);

  useEffect(() => {
    dispatch(dataSetGetMany());
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, []);
  const { user } = useSelector((state) => state.auth)


  useEffect(() => {
    if (user.token) {
      const checkToken = async () => {
        const loginToken = user.token.split(",")[0]
        dispatch(checkLogin(loginToken))
      }
      checkToken()
    }
  }, [])



  return (
    <div className="bg-slate-500 dark:bg-slate-500 sm:py-62">
     <Navbar />
     <ToastContainer />
     <Routes>
      <Route path="/" element={ <Home /> }/>
      <Route path="/contact" element={ <Contact /> }/>
      <Route path="/faq" element={ <Faq /> }/>
      <Route path="/login" element={ <Login /> }/>
      <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />                     
            <Route path="/projects/:id" element={<ProjectDetail />} />                     
            <Route path="/projects/:id/tasks" element={<ProjectTasks />} />                     
            <Route path="/contacts-inbox" element={<ContactsInbox />} /> 
            <Route path="/users" element={<Users />} /> 
            <Route path="/project-create" element={<ProjectCreateForm />} />
          </Route>
        </Route>
      <Route path="*" element={<NoMatch />} />
     </Routes>
    </div>
  )
}

export default App
