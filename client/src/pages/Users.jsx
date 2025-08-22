/* eslint-disable react/jsx-key */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { projectGetMany } from "../redux/projectsSlice";
import { userGetMany } from "../redux/userSlice";
import { toast } from "react-toastify"

const Users = () => {
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
    dispatch(userGetMany());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit");
    (toast.dark = true),
      toast.success(" Your Message has been sent!", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        className: "dark-toast",
        theme: "dark",
      });
   
  };

  return (
    <>
      {/* {user.roles.includes("Project Manager") ?
       (<ProjectDetailEdit />)
       :
       (<ProjectDetailRead />)
     
     } */}

      <div className="bg-gray-600 dark:bg-gray-600 p-4 sm:ml-64">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-gray-800 dark:bg-gray-800"></div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-500">
            <thead className="text-xs uppercase bg-gray-600 dark:bg-gray-600 text-gray-50 dark:text-gray-50">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center"></div>
                </th>
                <th scope="col" className="px-6 py-3">
                  User Name
                </th>

                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  User Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Project Description
                </th>

                <th scope="col" className="px-6 py-3">
                  Project Name
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
                      className="flex items-center px-6 py-4 text-purple-400 dark:text-purple-400 whitespace-nowrap"
                    >
                      {project.users.map((users) => (
                        <h1>
                          {users.firstName} {users.lastName}
                        </h1>
                      ))}
                    </td>

                    <td className="px-6 py-4 text-white dark:text-white">
                      {project.users.map((users) => (
                        <h1>{users.email}</h1>
                      ))}
                    </td>
                    <td className="px-6 py-4 text-white dark:text-white">
                      {project.users.map((users) => (
                        <h1>{users.roles}</h1>
                      ))}
                    </td>
                    <td className="px-6 py-4 text-white dark:text-white">
                      {project.projectDescription}
                    </td>
                    <td className="px-6 py-4 text-white dark:text-white">
                      {project.projectName}
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
          <div className="w-180 h-180 rounded-xl">
            <section className="bg-white dark:bg-gray-900">
              <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
                  Project Status
                </h2>
                <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                  {" "}
                  A quick update on milestones, challenges, or any needed
                  support would be really appreciated by the team. Remember,
                  "When we join together, we can swell the tide for the benefit
                  for all." Let us know.
                </p>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Your Name
                    </label>
                    <input
                      type="name"
                      id="name"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <label
                     htmlFor="projectName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Project Name
                    </label>
                    <input
                      type="text"
                      id="projectName"
                      className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                      placeholder="Name of Project"
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                     htmlFor="message"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >
                      Your message
                    </label>
                    <textarea
                      id="message"
                      rows="6"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Leave a comment..."
                    ></textarea>
                  </div>

                  <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
                      Final Report Message
                    </h2>
                    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                      {" "}
                      It's important to keep our project manager in the loop
                      about how things are progressing on our new initiative!
                      Remember Warm Wishes is all about providing warmth and
                      comfort during cold months.
                    </p>
                    <div className="sm:col-span-2">
                      <label
                       htmlFor="message"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >
                        Your message
                      </label>
                      <textarea
                        id="message"
                        rows="6"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Leave a comment..."
                      ></textarea>
                    </div>
                  </div>
                  <button
                   onClick={handleSubmit}
                    type="submit"
                    className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Send message
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
