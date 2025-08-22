import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { projectGetOne, projectTaskCreate, projectTaskUpdate, projectTaskDelete } from '../redux/projectsSlice'
import ProjectTaskDeleteModal from '../components/ProjectTaskDeleteModal'


const ProjectTasks = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  let projectId = location.pathname.split("/")[2]

  const initialTask = { taskIndex: 0, taskName: "", roles: [], users: [{ firstName: "", lastName: "" }] }

  const { project } = useSelector((state) => state.project)

  const [taskForm, setTaskForm] = useState([initialTask])
  const [addTaskForm, setAddTaskForm] = useState({ showAddForm: false, taskIndex: 0, taskName: "", roles: [], users: [{ firstName: "", lastName: "" }], submitEnabled: false })
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(initialTask)

  useEffect(() => {
    // let projectId = location.pathname.split("/")[2]
    console.log("ProjectTasks useEffect location", location, projectId)
    dispatch(projectGetOne(projectId))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log("ProjectTasks useEffect project", project)
    console.log("ProjectTasks useEffect project.tasks", project.tasks)
    setTaskForm(project.tasks)
  }, [project])

  useEffect(() => {
    console.log("useEffect taskForm", taskForm)
  }, [taskForm])

  const handleSave = (task) => {
    console.log("projectId:", projectId, "task:", task)
    dispatch(projectTaskUpdate({ projectId, task }))
  }

  const handleDelete = (task) => {
    console.log("handleDelete", task)
    dispatch(projectTaskDelete({ projectId, taskId: task._id }))
    setTaskForm(taskForm.filter(t => t._id !== task._id))
    setShowDeleteModal(false)
  }

  const handleAddTaskFormSave = (task) => {
    console.log("handleAddTaskForm")
    dispatch(projectTaskCreate({ projectId, task }))
    setTaskForm([ ...taskForm, task ])
    setAddTaskForm({ ...initialTask, showForm: false })
  }

  return ( 
   


      <div className="p-4 sm:ml-64 bg-gray-700 dark:bg-gray-700">
        <div className="relative overflow-x-auto shadow-md ">
          <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-slate-500 dark:bg-slate-500 sm:py-62">

    <div className="mt-5 ml-80 max-w-7xl mx-auto ">
      <div className="grid grid-cols-6 gap-5 mt-5 ">
        <button
          onClick={() => setAddTaskForm({ ...addTaskForm, showForm: true })}
          disabled={addTaskForm.showForm}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 disabled:bg-gray-300"
        >
          Add Task
        </button>
      </div>
      {addTaskForm.showForm && (
        <>
          <div className="grid grid-cols-6 gap-5 mt-5">
            <div>
              <label htmlFor={`task-name-new`} className="block text-sm/6 font-medium text-gray-900">Name</label>
              <input
                value={addTaskForm.taskName}
                onChange={(e) => setAddTaskForm({ ...addTaskForm, taskName: e.target.value, submitEnabled: true })}
                id={`task-name-new`}
                type="text" />
            </div>
            <div>
              <label htmlFor={`task-description-new`} className="block text-sm/6 font-medium text-gray-900">Description</label>
              <input
                value={addTaskForm.taskDescription}
                onChange={(e) => setAddTaskForm({ ...addTaskForm, taskDescription: e.target.value })}
                id={`task-description-new`}
                type="text" />
            </div>
            <div>
              <label htmlFor={`task-start-date-new`} className="block text-sm/6 font-medium text-gray-900">Start Date</label>
              <input
                value={addTaskForm.startDate}
                onChange={(e) => setAddTaskForm({ ...addTaskForm, startDate: e.target.value })}
                id={`task-start-date-new`}
                type="date" />
            </div>
            <div>
              <label htmlFor={`task-end-date-new`} className="block text-sm/6 font-medium text-gray-900">End Date</label>
              <input
                value={addTaskForm.endDate}
                onChange={(e) => setAddTaskForm({ ...addTaskForm, endDate: e.target.value })}
                id={`task-end-date-new`}
                type="date" />
            </div>
            <div>
              <label htmlFor={`task-status-new`} className="block text-sm/6 font-medium text-gray-900">Status</label>
              <input
                value={addTaskForm.status}
                onChange={(e) => setAddTaskForm({ ...addTaskForm, status: e.target.value })}
                type="text" />
            </div>
            <div></div>
          </div>
          <div className="grid grid-cols-6 gap-5">
            <div>
              <label htmlFor={`task-hours-estimated-new`} className="block text-sm/6 font-medium text-gray-900">Hours Estimated</label>
              <input
                value={addTaskForm.hoursEstimated}
                onChange={(e) => setAddTaskForm({ ...addTaskForm, hoursEstimated: e.target.value })}
                id={`task-hours-estimated-new`}
                type="number" />
            </div>
            <div>
              <label htmlFor={`task-hours-worked-new`} className="block text-sm/6 font-medium text-gray-900">Hours Worked</label>
              <input
                value={addTaskForm.hoursWorked}
                onChange={(e) => setAddTaskForm({ ...addTaskForm, hoursWorked: e.target.value })}
                id={`task-hours-worked-new`}
                type="number" />
            </div>
            <div>
              <label htmlFor={`task-roles-new`} className="block text-sm/6 font-medium text-gray-900">Roles</label>
              <select
                id={`task-roles-new`}
              // onChange={(e) => setAddTaskForm(taskForm.map(t => t._id === addTaskForm._id ? { ...t, roles: [ e.target.value ] } : t))}  
              >
                <option>{addTaskForm.roles[0]}</option>
              </select>
            </div>
            <div>
              <label htmlFor={`task-users-new`} className="block text-sm/6 font-medium text-gray-900">Users</label>
              <select
                id={`task-users-new`}
              // onChange={(e) => setAddTaskForm(taskForm.map(t => t._id === addTaskForm._id ? { ...t, users: [ e.target.value ] } : t))}  
              >
                <option>{addTaskForm.users[0].firstName} {addTaskForm.users[0].lastName}</option>
              </select>
            </div>
            <div></div>
            <div className="row-span-2">
              <button
                onClick={() => handleAddTaskFormSave(addTaskForm)}
                disabled={!addTaskForm.submitEnabled}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        </>
      )}
      {taskForm.map((task, index) => (
        <>
          <div className="grid grid-cols-6 gap-5 mt-5">
            <div>
              <label htmlFor={`task-name-${task._id}`} className="block text-sm/6 font-medium text-gray-900">Name</label>
              <input
                value={task.taskName}
                onChange={(e) => setTaskForm(taskForm.map(t => t._id === task._id ? { ...t, taskIndex: index, submitEnabled: true, taskName: e.target.value } : t))}
                id={`task-name-${task._id}`}
                type="text" />
            </div>
            <div>
              <label htmlFor={`task-description-${task._id}`} className="block text-sm/6 font-medium text-gray-900">Description</label>
              <input
                value={task.taskDescription}
                onChange={(e) => setTaskForm(taskForm.map(t => t._id === task._id ? { ...t, taskDescription: e.target.value } : t))}
                id={`task-description-${task._id}`}
                type="text" />
            </div>
            <div>
              <label htmlFor={`task-start-date-${task._id}`} className="block text-sm/6 font-medium text-gray-900">Start Date</label>
              <input
                value={task.startDate}
                onChange={(e) => setTaskForm(taskForm.map(t => t._id === task._id ? { ...t, startDate: e.target.value } : t))}
                id={`task-start-date-${task._id}`}
                type="date" />
            </div>
            <div>
              <label htmlFor={`task-end-date-${task._id}`} className="block text-sm/6 font-medium text-gray-900">End Date</label>
              <input
                value={task.endDate}
                onChange={(e) => setTaskForm(taskForm.map(t => t._id === task._id ? { ...t, endDate: e.target.value } : t))}
                id={`task-end-date-${task._id}`}
                type="date" />
            </div>
            <div>
              <label htmlFor={`task-status-${task._id}`} className="block text-sm/6 font-medium text-gray-900">Status</label>
              <input
                value={task.status}
                onChange={(e) => setTaskForm(taskForm.map(t => t._id === task._id ? { ...t, status: e.target.value } : t))}
                type="text" />
            </div>
            <div></div>
          </div>
          <div className="grid grid-cols-6 gap-5">
            <div>
              <label htmlFor={`task-hours-estimated-${task._id}`} className="block text-sm/6 font-medium text-gray-900">Hours Estimated</label>
              <input
                value={task.hoursEstimated}
                onChange={(e) => setTaskForm(taskForm.map(t => t._id === task._id ? { ...t, hoursEstimated: e.target.value } : t))}
                id={`task-hours-estimated-${task._id}`}
                type="number" />
            </div>
            <div>
              <label htmlFor={`task-hours-worked-${task._id}`} className="block text-sm/6 font-medium text-gray-900">Hours Worked</label>
              <input
                value={task.hoursWorked}
                onChange={(e) => setTaskForm(taskForm.map(t => t._id === task._id ? { ...t, hoursWorked: e.target.value } : t))}
                id={`task-hours-worked-${task._id}`}
                type="number" />
            </div>
            <div>
              <label htmlFor={`task-roles-${task._id}`} className="block text-sm/6 font-medium text-gray-900">Roles</label>
              <select
                id={`task-roles-${task._id}`}
              // onChange={(e) => setTaskForm(taskForm.map(t => t._id === task._id ? { ...t, roles: [ e.target.value ] } : t))}  
              >
                <option>{task.roles[0]}</option>
              </select>
            </div>
            <div>
              <label htmlFor={`task-users-${task._id}`} className="block text-sm/6 font-medium text-gray-900">Users</label>
              <select
                id={`task-users-${task._id}`}
              // onChange={(e) => setTaskForm(taskForm.map(t => t._id === task._id ? { ...t, users: [ e.target.value ] } : t))}  
              >
                <option>{task.users[0].firstName} {task.users[0].lastName}</option>
              </select>
            </div>
            <div></div>
            <div className="row-span-2">
              <button
                onClick={() => handleSave(task)}
                disabled={!task.submitEnabled}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-50"
              >
                Save
              </button>
              <button
                onClick={() => { setTaskToDelete(task); setShowDeleteModal(true); }}
                type="button"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Delete
              </button>
            </div>
           
          </div>
         
        </>
      ))

      
      }
      {showDeleteModal && <ProjectTaskDeleteModal setShowDeleteModal={setShowDeleteModal} handleDelete={handleDelete} taskToDelete={taskToDelete} />}
    </div >
   
   
   </div>
   </div>
   <div className="relative overflow-x-auto shadow-md ">
          <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-slate-500 dark:bg-slate-500">
            </div>
          </div>
   
   <div className="relative overflow-x-auto shadow-md ">
          <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-slate-500 dark:bg-slate-500">
            </div>
          </div>
   
   <div className="relative overflow-x-auto shadow-md ">
          <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-slate-500 dark:bg-slate-500">
            </div>
          </div>
   
   <div className="relative overflow-x-auto shadow-md ">
          <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-slate-500 dark:bg-slate-500">
            </div>
          </div>
   
   <div className="relative overflow-x-auto shadow-md ">
          <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-slate-500 dark:bg-slate-500">
            </div>
          </div>
   
   <div className="relative overflow-x-auto shadow-md ">
          <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-slate-500 dark:bg-slate-500">
            </div>
          </div>
   
   <div className="relative overflow-x-auto shadow-md ">
          <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-slate-500 dark:bg-slate-500">
            </div>
          </div>
   
   <div className="relative overflow-x-auto shadow-md ">
          <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-slate-500 dark:bg-slate-500">
            </div>
          </div>
   
   <div className="relative overflow-x-auto shadow-md ">
          <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-slate-500 dark:bg-slate-500">
            </div>
          </div>
   
   <div className="relative overflow-x-auto shadow-md ">
          <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-slate-500 dark:bg-slate-500">
            </div>
          </div>
   
   <div className="relative overflow-x-auto shadow-md ">
          <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-slate-500 dark:bg-slate-500">
            </div>
          </div>
   
   <div className="relative overflow-x-auto shadow-md ">
          <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-slate-500 dark:bg-slate-500">
            </div>
          </div>
   
   <div className="relative overflow-x-auto shadow-md ">
          <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-slate-500 dark:bg-slate-500">
            </div>
          </div>
   
   <div className="relative overflow-x-auto shadow-md ">
          <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-slate-500 dark:bg-slate-500">
            </div>
          </div>
   
   <div className="relative overflow-x-auto shadow-md ">
          <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-slate-500 dark:bg-slate-500">
            </div>
          </div>
   
   <div className="relative overflow-x-auto shadow-md ">
          <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-slate-500 dark:bg-slate-500">
            </div>
          </div>
   
   <div className="relative overflow-x-auto shadow-md ">
          <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-slate-500 dark:bg-slate-500">
            </div>
          </div>
   
   </div>   
 
);
   
 
}

export default ProjectTasks

