/* eslint-disable react/jsx-key */
import { Link } from "react-router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { projectGetMany } from "../redux/projectsSlice";
import { userGetMany } from "../redux/userSlice";
import ProjectDetailEdit from '../components/ProjectDetailEdit'
import ProjectDetailRead from '../components/ProjectDetailRead'


const ProjectDetail = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.project);
  console.log("projects", projects);

  
  if (user.roles.includes("Project Manager")) {
    console.log("Project Manager")
  }
  else {
    console.log(user.roles)
  }


  useEffect(() => {
    dispatch(projectGetMany(user.email));
    dispatch(userGetMany());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
     {user.roles.includes("Project Manager") ?
       (<ProjectDetailEdit />)
       :
       (<ProjectDetailRead />)
     
     }
       <div className="bg-gray-600 dark:bg-gray-600 p-4 sm:ml-64">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-gray-800 dark:bg-gray-800">
            
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-gray-600 dark:bg-gray-600 text-gray-50 dark:text-gray-50">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center"></div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Project Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Project Desription
                </th>
                <th scope="col" className="px-6 py-3">
                  Project Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Start Date
                </th>
                <th scope="col" className="px-6 py-3">
                  End Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Project Manager
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <>
                  <tr className="bg-gray-700 border-b dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-500 dark:hover:bg-gray-500">
                    <td className="w-4 p-4"></td>
                    <td
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap text-white dark:text-white"
                    >
                      <Link to={`/projects/${project.id}`}>
                        <div className="group relative">
                          <h3 className="font-medium text-blue-500 dark:text-blue-500 hover:underline">
                            {project.projectName}
                          </h3>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-white dark:text-white">
                      {project.projectDescription}
                    </td>
                    <td className="px-6 py-4 text-white dark:text-white">
                      {project.status}
                    </td>
                    <td className="px-6 py-4 text-white dark:text-white">
                      {project.startDate}
                    </td>
                    <td className="px-6 py-4 text-white dark:text-white">
                      {project.endDate}
                    </td>
                    <td className="px-6 py-4 text-purple-400 dark:text-purple-400">
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                        Joanne Liszewski
                      </div>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
         </div>
      </div>
    </>
  );
};

export default ProjectDetail;
