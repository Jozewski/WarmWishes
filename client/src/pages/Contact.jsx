import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { contactCreate } from "../redux/contactsSlice";
import { contactGetMany } from "../redux/contactsSlice";
import { toast } from "react-toastify"
import blankets from "../assets/images/Donations.png";
import helpers from "../assets/images/Helpers.png";
import host from "../assets/images/host.png";


const ContactForm = () => {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(contactGetMany());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("contact", contact);
  }, [contact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(contactCreate(contact));
    setContact({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      projectType: "",
      message: "",
    }); // clear the form after submitting
    toast.success("Your Message has been sent!", {
      position: "top-right",
      autoClose: 5000,
      closeOnClick: true,
      theme: "dark"
    })
    // Navigate is not needed since we're already on the contact page
    // navigate("/contact")
  };

  return (
    <>
      <div className="flex mx-auto bg-slate-500 dark:bg-slate-500 justify-center items-center">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-16 m-8">
          <div className="flex flex-col rounded-2xl w-full xl:w-96 bg-[#ffffff] text-[#374151] shadow-xl">
            <figure className="flex justify-center items-center">
              <img
                src={blankets}
                alt="Card Preview"
                className="rounded-t-2xl"
              />
            </figure>

            <div className="flex flex-col p-8 h-full">
              <div className="bg-green-400 text-green-800 text-3xl  font-bold pb-6 inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-green-400 dark:text-green-800 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 me-2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3.75v16.5M2.25 12h19.5M6.375 17.25a4.875 4.875 0 0 0 4.875-4.875V12m6.375 5.25a4.875 4.875 0 0 1-4.875-4.875V12m-9 8.25h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5Zm12.621-9.44c-1.409 1.41-4.242 1.061-4.242 1.061s-.349-2.833 1.06-4.242a2.25 2.25 0 0 1 3.182 3.182ZM10.773 7.63c1.409 1.409 1.06 4.242 1.06 4.242S9 12.22 7.592 10.811a2.25 2.25 0 1 1 3.182-3.182Z"
                  />
                </svg>
                Donate
              </div>
              <div className="font-bold  text-lg pb-12">
                We actively seek donations all year round getting ready for
                events each fall. We want to distibute warm items before winter
                in order to provide warmth when it is needed most. One of our
                partners is the Bombass Sock Company For every pair of socks
                sold, Bombass pledges to donate one pair to individuals
                experiencing homelessness, ensuring that everyone has access to
                the basic necessity of warm and comfortable footwear. By
                combining thier passion for fashion with thier commitment to
                social responsibility, they strive to make a difference in the
                world, one pair of socks at a time.
              </div>

              <div className="flex flex-grow"></div>
              <div className="flex pt-10">
                <button className="w-full bg-[#7e22ce] text-[#ffffff] font-bold text-base  rounded-lg bg-green-800 ">
                  Tax Deductable
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-2xl w-full xl:w-96 bg-[#ffffff] text-[#374151] shadow-xl">
            <figure className="flex justify-center items-center">
              <img src={helpers} alt="Card Preview" className="rounded-t-2xl" />
            </figure>

            <div className="flex flex-col p-8 h-full">
              <div className="bg-purple-500 text-purple-800 text-3xl  font-bold pb-6 inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-300 dark:text-purple-600 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="size-6 me-2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                  />
                </svg>
                Volunteer
              </div>
              <div className="font-bold  text-lg pb-12">
                Join our dedicated team of volunteers, your contribution can
                make a significant difference in the lives of those in need. By
                offering your time and effort, you become an integral part of a
                compassionate community that strives to provide comfort and
                warmth to individuals facing the harsh realities of
                homelessness. Your willingness to volunteer, helps ensure that
                everyone has access to essential items that can protect them
                from the cold and bring a sense of dignity and care during the
                winter season. Join us and help make a difference!
              </div>

              <div className="flex flex-grow"></div>
              <div className="flex pt-10">
                <button className="w-full bg-[#7e22ce] text-[#ffffff] font-bold text-base  rounded-lg bg-purple-800 ">
                  Join Us
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col rounded-2xl w-full xl:w-96 bg-[#ffffff] text-[#374151] shadow-xl">
            <figure className="flex justify-center items-center">
              <img src={host} alt="Card Preview" className="rounded-t-2xl" />
            </figure>

            <div className="flex flex-col p-8 h-full">
              <div className="bg-red-300 text-red-800 text-3xl  font-bold pb-6 inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-red-300 dark:text-red-600 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="red"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-8 me-2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                  />
                </svg>
                Host an Event
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="red"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-8 m-2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                  />
                </svg>
              </div>
              <div className="font-bold  text-lg pb-12">
                Here at Warm Wishes, we are deeply committed to supporting our
                local community by partnering with local shelters. However, we
                are aware that the shelters have not been able to solve all the
                issues faced by those individuals and families facing
                homelessness. While we continue to partner with them we also ask
                that everyone who is willing to become part of the solution to
                reach out and join with us in our ongoing efforts. If you are
                willing to host an event at your location cantact us and we can
                make it a reality. Together we can make a difference!
              </div>

              <div className="flex flex-grow"></div>
              <div className="flex pt-10">
                <button className="w-full bg-[#7e22ce] text-[#ffffff] font-bold text-base  rounded-lg bg-red-800 ">
                  Local Outreach
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="bg-slate-500 dark:bg-slate-500">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-white dark:text-white">
            Contact Us
          </h2>
          <p className="mb-4 text-white dark:text-white">
            You will hear from us within 24 hours. Please include the area of
            interest in which you would like to serve. Let us know what works
            for you! We are here to help and are dedicated to making a
            difference!{" "}
          </p>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Your First Name
              </label>
              <input
                type="text"
                value={contact.firstName}
                onChange={(e) =>
                  setContact({ ...contact, firstName: e.target.value })
                }
                id="firstName"
                   className="shadow-sm bg-slate-400 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-slate-400 dark:border-gray-600  placeholder-gray-900 dark:placeholder-gray-900 dark:text-gray-900 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="first name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Your Last Name
              </label>
              <input
                type="text"
                value={contact.lastName}
                onChange={(e) =>
                  setContact({ ...contact, lastName: e.target.value })
                }
                id="lastName"
                className="shadow-sm bg-slate-400 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-slate-400 dark:border-gray-600  placeholder-gray-900 dark:placeholder-gray-900 dark:text-gray-900 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="last name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                value={contact.email}
                onChange={(e) =>
                  setContact({ ...contact, email: e.target.value })
                }
                id="email"
                  className="shadow-sm bg-slate-400 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-slate-400 dark:border-gray-600  placeholder-gray-900 dark:placeholder-gray-900 dark:text-gray-900 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="name@email.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Contact Phone
              </label>
              <input
                type="tel"
                value={contact.phone}
                onChange={(e) =>
                  setContact({ ...contact, phone: e.target.value })
                }
                id="phone"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                 className="shadow-sm bg-slate-400 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-slate-400 dark:border-gray-600  placeholder-gray-900 dark:placeholder-gray-900 dark:text-gray-900 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="555-555-5555"
                required
              />
            </div>
            <div>
              <label
                htmlFor="projectType"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Area of Interest
              </label>
              <select
                value={contact.projectType}
                onChange={(e) =>
                  setContact({ ...contact, projectType: e.target.value })
                }
                id="projectType"
                 className="shadow-sm bg-slate-400 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-slate-400 dark:border-gray-600  placeholder-gray-900 dark:placeholder-gray-900 dark:text-gray-900 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              >
                <option defaultValue>Let us know how you wish to serve</option>
                <option value="Upcoming Event">Host an Event</option>
                <option value="Volunteer Training">Volunteer</option>
                <option value="Corporate Partnership Drive">
                  Partner with Warm Wishes to Sponsor a Donation Drive
                </option>
                <option value="Recieving and Inventory">Donate Supplies</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Your message
              </label>
              <textarea
                id="message"
                value={contact.message}
                onChange={(e) =>
                  setContact({ ...contact, message: e.target.value })
                }
                rows="6"
                className="shadow-sm bg-slate-400 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-slate-400 dark:border-gray-600  placeholder-gray-900 dark:placeholder-gray-900 dark:text-gray-900 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="Leave a question or comment..."
              ></textarea>
            </div>

            <button
              onClick={handleSubmit}
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-solid focus:ring-blue-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:ring-blue-800 dark:focus:ring-blue-800"
            >
              Send info
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
