/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { projectGetMany, projectDonationUpdate } from "../redux/projectsSlice";
import { Link } from "react-router";
import { toast } from "react-toastify"

const Projects = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { projects, loading } = useSelector((state) => state.project);

  // State for donation form
  const [donationForm, setDonationForm] = useState({
    projectName: "",
    donations: [{ donatedItem: "", numberOfItems: 0 }],
    category: "",
    status: "",
    description: ""
  });

  useEffect(() => {
    dispatch(projectGetMany(user.email));
  }, []);

  const addDonationField = () => {
    setDonationForm({
      ...donationForm,
      donations: [...donationForm.donations, { donatedItem: "", numberOfItems: 0 }]
    });
  };

  const removeDonationField = (index) => {
    const newDonations = donationForm.donations.filter((_, i) => i !== index);
    setDonationForm({
      ...donationForm,
      donations: newDonations
    });
  };

  const updateDonation = (index, field, value) => {
    const newDonations = [...donationForm.donations];
    newDonations[index][field] = value;
    setDonationForm({
      ...donationForm,
      donations: newDonations
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Find the project by name
    const selectedProject = projects.find(p => p.projectName === donationForm.projectName);

    if (!selectedProject) {
      toast.error("Please select a valid project!", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "dark",
      });
      return;
    }

    // Validate that at least one donation has data
    const validDonations = donationForm.donations.filter(
      d => d.donatedItem && d.numberOfItems > 0
    );

    if (validDonations.length === 0) {
      toast.error("Please add at least one donation item!", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "dark",
      });
      return;
    }

    try {
      await dispatch(projectDonationUpdate({
        projectId: selectedProject.id,
        donationData: {
          donations: validDonations,
          category: donationForm.category,
          status: donationForm.status,
          description: donationForm.description
        }
      })).unwrap();

      toast.success("The Donations have been updated!", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "dark",
      });

      // Reset form
      setDonationForm({
        projectName: "",
        donations: [{ donatedItem: "", numberOfItems: 0 }],
        category: "",
        status: "",
        description: ""
      });

      // Refresh projects list
      dispatch(projectGetMany(user.email));
    } catch (error) {
      toast.error("Failed to update donations. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "dark",
      });
    }
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
                        htmlFor="projectName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Project Name
                      </label>
                      <select
                        name="projectName"
                        id="projectName"
                        value={donationForm.projectName}
                        onChange={(e) => setDonationForm({ ...donationForm, projectName: e.target.value })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required
                      >
                        <option value="">Select a project</option>
                        {projects.map((project) => (
                          <option key={project.id} value={project.projectName}>
                            {project.projectName}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Dynamic Donation Fields */}
                    <div className="sm:col-span-2">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          Donation Items
                        </h3>
                        <button
                          type="button"
                          onClick={addDonationField}
                          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                        >
                          + Add Item
                        </button>
                      </div>

                      {donationForm.donations.map((donation, index) => (
                        <div key={index} className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
                          <div className="w-full">
                            <label
                              htmlFor={`donatedItem-${index}`}
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Donated Item {index + 1}
                            </label>
                            <input
                              type="text"
                              id={`donatedItem-${index}`}
                              value={donation.donatedItem}
                              onChange={(e) => updateDonation(index, 'donatedItem', e.target.value)}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                              placeholder="e.g., Blankets, Socks, Coats"
                            />
                          </div>
                          <div className="w-full">
                            <label
                              htmlFor={`numberOfItems-${index}`}
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Number of Items
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="number"
                                id={`numberOfItems-${index}`}
                                value={donation.numberOfItems}
                                onChange={(e) => updateDonation(index, 'numberOfItems', parseInt(e.target.value) || 0)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="100"
                                min="0"
                              />
                              {donationForm.donations.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeDonationField(index)}
                                  className="text-red-600 hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
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
                        value={donationForm.category}
                        onChange={(e) => setDonationForm({ ...donationForm, category: e.target.value })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option value="">Select category</option>
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
                        value={donationForm.status}
                        onChange={(e) => setDonationForm({ ...donationForm, status: e.target.value })}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      >
                        <option value="">Select status</option>
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
                        value={donationForm.description}
                        onChange={(e) => setDonationForm({ ...donationForm, description: e.target.value })}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Write a message describing the status of projects current needs here after the donations entered above..."
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Updating..." : "Update Donations"}
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
