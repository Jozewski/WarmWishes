/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { projectGetMany } from "../redux/projectsSlice";
import { Link } from "react-router";
import { toast } from "react-toastify"

const Projects = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.project);
  console.log("projects", projects);

  if (user.roles.includes("Project Manager")) {
    console.log("Project Manager");
  } else {
    console.log(user.roles);
  }

  useEffect(() => {
    dispatch(projectGetMany(user.email));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit");
    (toast.dark = true),
      toast.success(" The Donations have been updated!", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        className: "dark-toast",
        theme: "dark",
      });
   
  };

  return (
    <>
      <div className="bg-gray-900 dark:bg-gray-900 p-4 sm:ml-64">
        <div className="bg-slate-500 dark:bg-slate-500 relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-gray-700 dark:bg-gray-970 sm:py-62">
            <div></div>
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

      <div className="bg-gray-900 dark:bg-gray-900 sm:ml-64">
        <div className="grid grid-cols-1 xl:grid-cols-1 gap-11 px-4 py-3  ">
          <div className="w-180 h-180 dark:bg-slate-500 rounded-xl">
            <section className="bg-white dark:bg-gray-900">
              <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  Donations Update
                </h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Project Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Type project name"
                        required=""
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="donations"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Donations
                      </label>
                      <input
                        type="text"
                       name="donations"
                        id="donations"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Donated Items"
                        required=""
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="numberOfItems"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Number of Items
                      </label>
                      <input
                        type="number"
                         name="numberOfItems"
                        id="numberOfItems"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="100"
                        required=""
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="donations"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Donations
                      </label>
                      <input
                        type="text"
                       name="donations"
                        id="donations"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Donated Items"
                        required=""
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="numberOfItems"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Number of Items
                      </label>
                      <input
                        type="number"
                         name="numberOfItems"
                        id="numberOfItems"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="100"
                        required=""
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="donations"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Donations
                      </label>
                      <input
                        type="text"
                       name="donations"
                        id="donations"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="donatedItems"
                        required=""
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="numberOfItems"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Number of Items
                      </label>
                      <input
                        type="number"
                        name="numberOfItems"
                        id="numberOfItems"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="100"
                        required=""
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="donations"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Donations
                      </label>
                      <input
                        type="text"
                       name="donations"
                        id="donations"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Donated Items"
                        required=""
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="numberOfItems"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Number of Items
                      </label>
                      <input
                        type="number"
                         name="numberOfItems"
                        id="numberOfItems"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="100"
                        required=""
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="donations"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Donations
                      </label>
                      <input
                        type="text"
                       name="donations"
                        id="donations"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Donated Items"
                        required=""
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="numberOfItems"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Number of Items
                      </label>
                      <input
                        type="number"
                         name="numberOfItems"
                        id="numberOfItems"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="100"
                        required=""
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="donations"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Donations
                      </label>
                      <input
                        type="text"
                       name="donations"
                        id="donations"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Donated Items"
                        required=""
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="numberOfItems"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Number of Items
                      </label>
                      <input
                        type="number"
                         name="numberOfItems"
                        id="numberOfItems"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="100"
                        required=""
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="donations"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Donations
                      </label>
                      <input
                        type="text"
                       name="donations"
                        id="donations"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Donated Items"
                        required=""
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="numberOfItems"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Number of Items
                      </label>
                      <input
                        type="number"
                         name="numberOfItems"
                        id="numberOfItems"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="100"
                        required=""
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="donations"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Donations
                      </label>
                      <input
                        type="text"
                       name="donations"
                        id="donations"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Donated Items"
                        required=""
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="numberOfItems"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Number of Items
                      </label>
                      <input
                        type="number"
                         name="numberOfItems"
                        id="numberOfItems"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="100"
                        required=""
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="donations"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Donations
                      </label>
                      <input
                        type="text"
                       name="donations"
                        id="donations"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Donated Items"
                        required=""
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="numberOfItems"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Number of Items
                      </label>
                      <input
                        type="number"
                         name="numberOfItems"
                        id="numberOfItems"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="100"
                        required=""
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="donations"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Donations
                      </label>
                      <input
                        type="text"
                       name="donations"
                        id="donations"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Donated Items"
                        required=""
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="numberOfItems"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Number of Items
                      </label>
                      <input
                        type="number"
                         name="numberOfItems"
                        id="numberOfItems"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="100"
                        required=""
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="donations"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Donations
                      </label>
                      <input
                        type="text"
                       name="donations"
                        id="donations"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Donated Items"
                        required=""
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="numberOfItems"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Number of Items
                      </label>
                      <input
                        type="number"
                         name="numberOfItems"
                        id="numberOfItems"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="100"
                        required=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="category"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Category
                      </label>
                      <select
                        id="category"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option defaultValue=""></option>
                        <option value="Bulk">Bulk</option>
                        <option value="Corporate Sponsor">
                          Corporate Sponsor
                        </option>
                        <option value="Individual">Individual</option>
                        <option value="Clothing Drive">Clothing Drive</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="status"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Project Status
                      </label>
                      <select
                        id="status"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option defaultValue=""></option>
                        <option value="Active">Active</option>
                        <option value="Upcoming">Upcoming</option>
                        <option value="Being Deployed">Being Deployed</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Under Developement">
                          Under Developement
                        </option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        rows="8"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Write a message describing the status of projects current needs here after the donations entered above..."
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      type="submit"
                      className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Update Donations
                    </button>
                    <button
                   onClick={handleSubmit}
                      type="button"
                      className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                      <svg
                        className="w-5 h-5 mr-1 -ml-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Delete
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
