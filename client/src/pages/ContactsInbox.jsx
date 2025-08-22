import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { contactGetMany } from "../redux/contactsSlice";

const ContactsInbox = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { contacts } = useSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(contactGetMany(user.email));
    console.log("contacts", contacts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  return (
    <div className="bg-gray-900 dark:bg-gray-900 p-4 sm:ml-64">
      <div className="bg-slate-500 dark:bg-slate-500 relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-gray-800 dark:bg-gray-800"></div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-500">
          <thead className="text-xs text-white uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr className="bg-gray-700 dark:bg-gray-700">
              <th scope="col" className="p-4">
                <div className="flex items-center"></div>
              </th>
              <th scope="col" className="px-6 py-3">
                Project Type
              </th>
              <th scope="col" className="px-6 py-3">
                Contact Info
              </th>
              <th scope="col" className="px-6 py-3">
                Message
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {/* // [   "Corporate Sponsor Outreach" ] */}
            {user.roles[0] == "Local Missions"
              ? contacts.map((contact) =>
                  contact.projectType == "Upcoming Event" ? (
                    <>
                      <tr className="border-b bg-gray-700 dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-500 dark:hover:bg-gray-700">
                        <td className="w-4 p-4"></td>
                        <td className="flex items-center px-6 py-4 text-gray-50 whitespace-nowrap dark:text-gray-50">
                          {contact.projectType}
                        </td>

                        <td className="px-6 py-4 text-gray-50 dark:text-gray-50">
                          {contact.firstName} {contact.lastName}
                          <br></br>
                          {contact.email}
                          <br></br>
                          {contact.phone}
                        </td>
                        <td className="px-6 py-4 text-gray-50 dark:text-gray-50">
                          {contact.message}
                        </td>
                        <td className="px-6 py-4 text-gray-50 dark:text-gray-50">
                          <td className="flex items-center">
                            <td className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></td>{" "}
                            Unread
                          </td>
                        </td>
                      </tr>
                    </>
                  ) : null
                )
              : user.roles[0] == "Inventory and Control"
              ? contacts.map((contact) =>
                  contact.projectType == "Recieving and Inventory" ? (
                    <>
                      <tr className="border-b bg-gray-700 dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-500 dark:hover:bg-gray-700">
                        <td className="w-4 p-4"></td>
                        <td className="flex items-center px-6 py-4 text-gray-50 whitespace-nowrap dark:text-gray-50">
                          {contact.projectType}
                        </td>

                        <td className="px-6 py-4 text-gray-50 dark:text-gray-50">
                          {contact.firstName} {contact.lastName}
                          <br></br>
                          {contact.email}
                          <br></br>
                          {contact.phone}
                        </td>
                        <td className="px-6 py-4 text-gray-50 dark:text-gray-50">
                          {contact.message}
                        </td>
                        <td className="px-6 py-4 text-gray-50 dark:text-gray-50">
                          <td className="flex items-center">
                            <td className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></td>{" "}
                            Unread
                          </td>
                        </td>
                      </tr>
                    </>
                  ) : null
                )
              : user.roles[0] == "Helping Hands Handler"
              ? contacts.map((contact) =>
                  contact.projectType == "Volunteer Training" ? (
                    <>
                      <tr className="border-b bg-gray-700 dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-500 dark:hover:bg-gray-700">
                        <td className="w-4 p-4"></td>
                        <td className="flex items-center px-6 py-4 text-gray-50 whitespace-nowrap dark:text-gray-50">
                          {contact.projectType}
                        </td>

                        <td className="px-6 py-4 text-gray-50 dark:text-gray-50">
                          {contact.firstName} {contact.lastName}
                          <br></br>
                          {contact.email}
                          <br></br>
                          {contact.phone}
                        </td>
                        <td className="px-6 py-4 text-gray-50 dark:text-gray-50">
                          {contact.message}
                        </td>
                        <td className="px-6 py-4 text-gray-50 dark:text-gray-50">
                          <td className="flex items-center">
                            <td className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></td>{" "}
                            Unread
                          </td>
                        </td>
                      </tr>
                    </>
                  ) : null
                )
              : user.roles[0] == "Corporate Sponsor Outreach"
              ? contacts.map((contact) =>
                  contact.projectType == "Corporate Partnership Drive" ? (
                    <>
                      <tr className="border-b bg-gray-700 dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-500 dark:hover:bg-gray-700">
                        <td className="w-4 p-4"></td>
                        <td className="flex items-center px-6 py-4 text-gray-50 whitespace-nowrap dark:text-gray-50">
                          {contact.projectType}
                        </td>

                        <td className="px-6 py-4 text-gray-50 dark:text-gray-50">
                          {contact.firstName} {contact.lastName}
                          <br></br>
                          {contact.email}
                          <br></br>
                          {contact.phone}
                        </td>
                        <td className="px-6 py-4 text-gray-50 dark:text-gray-50">
                          {contact.message}
                        </td>
                        <td className="px-6 py-4 text-gray-50 dark:text-gray-50">
                          <td className="flex items-center">
                            <td className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></td>{" "}
                            Unread
                          </td>
                        </td>
                      </tr>
                    </>
                  ) : null
                )
              : user.roles[0] == "Project Manager"
              ? contacts.map((contact) => (
                  <>
                    <tr className="border-b bg-gray-700 dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-500 dark:hover:bg-gray-700">
                      <td className="w-4 p-4"></td>
                      <td className="flex items-center px-6 py-4 text-gray-50 whitespace-nowrap dark:text-gray-50">
                        {contact.projectType}
                      </td>

                      <td className="px-6 py-4 text-gray-50 dark:text-gray-50">
                        {contact.firstName} {contact.lastName}
                        <br></br>
                        {contact.email}
                        <br></br>
                        {contact.phone}
                      </td>
                      <td className="px-6 py-4 text-gray-50 dark:text-gray-50">
                        {contact.message}
                      </td>
                      <td className="px-6 py-4 text-gray-50 dark:text-gray-50">
                        <td className="flex items-center">
                          <td className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></td>{" "}
                          Unread
                        </td>
                      </td>
                    </tr>
                  </>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactsInbox;
