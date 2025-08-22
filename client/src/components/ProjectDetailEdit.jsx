/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { projectGetOne, projectUpdate } from "../redux/projectsSlice";


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
                Project was Updated!
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

const ProjectDetailEdit = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { project } = useSelector((state) => state.project);
  const { users } = useSelector((state) => state.user);
 

  const [projectForm, setProjectForm] = useState({
    projectName: "",
    projectDescription: "",
    startDate: "",
    endDate: "",
    roles: [],
    users: {},
  });

  // eslint-disable-next-line no-unused-vars
  const [showModal, setShowModal] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  useEffect(() => {
    let projectId = location.pathname.split("/")[2];
    console.log("ProjectDetailEdit useEffect location", location, projectId);
    dispatch(projectGetOne(projectId));
  }, []);

  useEffect(() => {
    if (project.projectName !== "") {
      setProjectForm(project);
    }
  }, []); 

  useEffect(() => {
    console.log("users", users);
  }, [users]);

  useEffect(() => {
    console.log("project", project);
  }, [project]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let projectId = location.pathname.split("/")[2];
    console.log("ProjectDetailEdit useEffect location", location, projectId);
    console.log("handleSubmit");
    console.log("project", projectId, project);
   
    dispatch(projectUpdate({ projectId: projectId, project: projectForm }));
    setShowModal(true);
    setSubmitDisabled(true);
  };

  return (
    <>
      <div className="bg-gray-600 dark:bg-gray-600 p-4 sm:ml-64">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-5">
            <label
              htmlFor="project-name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Project Name
            </label>
            <input
              value={projectForm.projectName}
              onChange={(e) =>
                setProjectForm({ ...projectForm, projectName: e.target.value })
              }
              type="text"
              id="project-name"
              className="shadow-sm bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Project Name"
              required
            />
          </div>      

          <div className="mb-5">
            <label
              htmlFor="project-startDate"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Project Start Date
            </label>
            <input
              value={projectForm.startDate}
              onChange={(e) =>
                setProjectForm({ ...projectForm, startDate: e.target.value })
              }
              id="projectStartDate"
              name="start"
              type="text"
              className="shadow-sm bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Project start date "
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="projectEndDate"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Project End Date
            </label>
          <input
            value={projectForm.endDate}
            onChange={(e) =>
              setProjectForm({ ...projectForm, endDate: e.target.value })
            }
            id="project-endDate"
            name="start"
            type="text"
            className="shadow-sm bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Project end date "
          />
            </div>

          <div className="mb-5">
            <label
              htmlFor="status"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Project Status
            </label>
            <select
              value={projectForm.status}
              onChange={(e) =>
                setProjectForm({ ...projectForm, status: e.target.value })
              }
              id="status"
              className="bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option defaultValue>Select a status</option>
              <option value="Active">
                Active: The project is currently being worked on
              </option>
              <option value="Completed">
                Completed: The project is finished and all tasks and events have
                been completed
              </option>
              <option value="Upcoming">
                Upcoming: The project is still being developed or prepared by
                the event host and volunteers
              </option>
              <option value="Being Deployed">
                Being Deployed: The project is currently being Being Deployed
                and we are actively engaing in all phases
              </option>
              <option value="Ongoing">
                Ongoing: The project is still in progress but still in need of
                more volunteers and donations.
              </option>
              <option value="Under Developement">
                Under Developement: The project has been scheduled but has not
                yet been started
              </option>
            </select>
          </div>         

          <button
            disabled={submitDisabled}
            type="submit"
            className="text-white disabled:cursor-not-allowed bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update Project
          </button>
          </form>
          {showModal && <Modal />}
      </div>
    </>
  );
};

export default ProjectDetailEdit;
