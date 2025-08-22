/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { projectCreate } from "../redux/projectsSlice";
import { builderGetMany } from "../redux/builderSlice";
import { userGetMany } from "../redux/userSlice";

// TODO: Replace exclamation on modal with something successful

const Modal = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        id="popup-modal"
        tabIndex="-1"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-100 left-100 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-gray-700 rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={() => navigate("/dashboard")}
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Project was created successfully.
              </h3>
              <button
                onClick={() => navigate("/dashboard")}
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ProjectCreateForm = () => {
  const [project, setProject] = useState({
    projectName: "",
    projectDescription: "",
    startDate: "",
    endDate: "",
    status: "",
    tasks:[],
    roles: [],
    users: {},
    user: {},
  });

  const [showModal, setShowModal] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const { loading } = useSelector((state) => state.project);
  const { builders } = useSelector((state) => state.builder);
  const { users } = useSelector((state) => state.user);

 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(builderGetMany());
    dispatch(userGetMany());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log("builders", builders);
  }, [builders]);

  useEffect(() => {
    console.log("users", users);
  }, [users]);

  useEffect(() => {
    console.log("project", project);
  }, [project]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit");
    console.log("FORM project", project);
    console.log(builders);
   
    const taskUser = users.find((user) =>
      user.roles.includes(project.roles[0])
    );
    console.log("taskUser", taskUser);
    // const tasks = builders.map(builder => builder.name)
    // Validation lol
    // const createdProject={
    //   projectName: project.projectName,
    //   projectDescription: project.projectDescription,
    //   startDate: project.startDate,
    //   endDate: project.endDate,
    //   status: project.status,
    //   tasks:project.tasks,     
    //   users: [taskUser],
    //   user: project.user
    // };
    const createdProject={
      projectName: project.projectName,
      projectDescription: project.projectDescription,
      startDate: project.startDate,
      endDate: project.endDate,
      status: project.status,
      tasks:project.tasks,     
      users: [taskUser],
      user: {
        firstName: "Joanne",
        lastName: "Lisewski",
        email: "jliszewski@perseverenow.org",
        username: "joski2025",
        roles: ["Project Manager"]
      }
    };
    dispatch(projectCreate(createdProject));
    setShowModal(true);
    setSubmitDisabled(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="project-name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Project Name
          </label>
          <input
            value={project.projectName}
            onChange={(e) =>
              setProject({ ...project, projectName: e.target.value })
            }
            type="text"
            id="project-name"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Project Name"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="project-description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Project Description
          </label>
          <input
            value={project.projectDescription}
            onChange={(e) =>
              setProject({ ...project, projectDescription: e.target.value })
            }
            type="text"
            id="project-description"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Project Description"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="projectType"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select a project type
          </label>
          <select              
            value={project.projectType}
            onChange={(e) =>
              setProject({
                ...project,
                projectType: e.target.value,
                roles: builders.find(
                  (builder) => builder.projectType === e.target.value
                ).roles,
              })
            }
            id="projectType"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option defaultValue>Choose a project type</option>
            {builders.map((type) => (
              <option key={type.projectType.id} value={type.projectType}>
                {type.projectType}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label
            htmlFor="project-startDate"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Project Start Date
          </label>
          <input
            value={project.startDate}
            onChange={(e) =>
              setProject({ ...project, startDate: e.target.value })
            }
            id="project-startDate"
            name="start"
            type="text"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Project start date "
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="project-endDate"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Project End Date
          </label>
          <input
            value={project.endDate} 
            onChange={(e) =>
              setProject({ ...project, endDate: e.target.value })
            }
            id="project-endDate"
            name="end"
            type="text"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Project end date "
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="status"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select a Status
          </label>
          <select
            value={project.status}
            onChange={(e) => setProject({ ...project, status: e.target.value })}
            id="status"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option defaultValue>Select a status</option>
            <option value="Active">
              Active: The project is currently being worked on
            </option>
            <option value="Completed">
              Completed: The project is finished and all tasks and events
              have been completed
            </option>
            <option value="Upcoming">
              Upcoming: The project is still being developed or prepared by the
              event host and volunteers
            </option>
            <option value="Being Deployed">
              Being Deployed: The project is currently being Being Deployed
              and we are actively engaing in all phases
            </option>
            <option value="Ongoing">
              Ongoing: The project is still in progress but still in need of more volunteers and donations.
            </option>
            <option value="Under Developement">
              Under Developement: The project has been scheduled but has not yet
              been started
            </option>
          </select>
        </div>
        <div className="mb-5">
          <label
            htmlFor="users"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select User
          </label>
          <select
            value={project.roles}
            onChange={(e) =>
              setProject({
                ...project,
                roles: [...e.target.selectedOptions].map((o) => o.value),
              })
            }
            multiple
            id="roles"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {project.projectType ? (
              builders
                .find((builder) => builder.projectType === project.projectType)
                .roles.map((role, index) => (
                  <option key={index} value={role}>
                    {role} (
                    {users.find((user) => user.roles.includes(role)).firstName}{" "}
                    {users.find((user) => user.roles.includes(role)).lastName})
                  </option>
                ))
            ) : (
              <option defaultValue>Choose a project type</option>
            )}
          </select>
        </div>

        <div className="mb-5">
          <label
            htmlFor="tasks"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select User Task
          </label>
          <select
            value={project.tasks}
            onChange={(e) =>
              setProject({
                ...project,
                tasks: [...e.target.selectedOptions].map((o) => o.value),
              })
            }
            multiple
            id="tasks"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {project.projectType ? (
              builders
                .find((builder) => {
                  console.log(builder, project);
                  return builder.projectType === project.projectType;
                })
                .tasks.map((task, index) => (
                  <option key={index} value={task.taskName}>
                    {task.taskName}
                  </option>
                ))
            ) : (
              <option defaultValue>Choose a project type</option>
            )}
          </select>
        </div>

        <div className="mb-5">
          <label
            htmlFor="projectManager"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
           Project Manager
          </label>
          <select
            value={project.user}
            onChange={(e) =>
              setProject({
                ...project,
                user: [...e.target.selectedOptions].map((o) => o.value),
              })
            }
      
            id="projectManager"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
           
              <option defaultValue>Joanne Liszewski</option>
            
          </select>
        </div>

        <button
          disabled={submitDisabled}
          type="submit"
          className="text-white disabled:cursor-not-allowed bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create Project
        </button>
      </form>
      {showModal && <Modal />}
    </>
  );
};

export default ProjectCreateForm;
