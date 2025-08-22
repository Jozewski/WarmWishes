/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import clients from "../assets/images/Home4.png";
import clients1 from "../assets/images/Clients1.png";
import clients2 from "../assets/images/Clients2.png";
import clients3 from "../assets/images/Home.png";
import clients5 from "../assets/images/Home3.png";
// import clients6 from "../assets/images/Home1.png";
import clients7 from "../assets/images/4Clients.png";
// import donate from "../assets/images/donate.png";
import socks from "../assets/images/socks.png";
// import hands from "../assets/images/hands.png";
import help from "../assets/images/help.png";
import help2 from "../assets/images/help2.png";
import Hygiene1 from "../assets/images/Hygiene1.png";

const Home = () => {
  return (
    <>
      <section
        className="bg-slate-500 dark:bg-slate-500
"
      >
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
          <div className="bg-gray-800 dark:bg-gray-800 border border-gray-400 dark:border-gray-400 rounded-lg p-8 md:p-12 mb-8">
            <h1 className="text-white dark:text-white text-3xl md:text-5xl font-extrabold mb-2">
              At Warm Wishes, our mission is to provide warmth and comfort to
              those who are most vulnerable during the cold months.
            </h1>
            <p className="text-lg font-normal text-white dark:text-white mb-6">
              We believe that everyone deserves to be protected from the harsh
              elements, regardless of their circumstances. Our dedicated team of
              volunteers and staff work tirelessly to collect, sort, and
              distribute warm clothing and blankets to individuals and families
              in need. We strive to make a positive impact in our community by
              ensuring that no one has to face the winter season without the
              basic necessities for staying warm. Through our efforts, we aim to
              bring hope, relief, and a sense of security to those who need it
              most.
            </p>
            <div className="flex">
              <img className="mr-2 w-30 h-36" src={clients1} />
              <img className="mr-2 w-30 h-36" src={clients2} />

              <img className="mr-2 w-30 h-36" src={clients} />
              <img className="mr-2 w-30 h-36" src={clients3} />
              <img className="mr-2 w-30 h-36" src={clients5} />
{/* 
              <img className="mr-2 w-30 h-36" src={clients6} /> */}
              <img className="mr-2 w-30 h-36" src={clients7} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 dark:bg-gray-800 border border-gray-400 dark:border-gray-400 rounded-lg p-8 md:p-12">
              <Link
                to="/contact"
                className="bg-green-400 text-black text-xs font-bold inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-green-400 dark:text-black mb-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="black"
                  className="size-6 me-2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3.75v16.5M2.25 12h19.5M6.375 17.25a4.875 4.875 0 0 0 4.875-4.875V12m6.375 5.25a4.875 4.875 0 0 1-4.875-4.875V12m-9 8.25h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v13.5a1.5 1.5 0 0 0 1.5 1.5Zm12.621-9.44c-1.409 1.41-4.242 1.061-4.242 1.061s-.349-2.833 1.06-4.242a2.25 2.25 0 0 1 3.182 3.182ZM10.773 7.63c1.409 1.409 1.06 4.242 1.06 4.242S9 12.22 7.592 10.811a2.25 2.25 0 1 1 3.182-3.182Z"
                  />
                </svg>
                Donate
              </Link>
              <h2 className="text-white dark:text-white text-2xl font-extrabold mb-2">
                Here at Warm Wishes, we are deeply committed to supporting our
                local community by partnering with various shelters and food
                banks.
              </h2>
              <p className="text-lg font-normal text-white dark:text-white mb-4">
                These collaborations are essential in addressing the needs of
                those who are less fortunate and ensuring that no one in our
                community goes hungry or without a safe place to stay. Our
                partnerships with local shelters provide a lifeline for
                individuals and families facing homelessness, offering them
                temporary housing, counseling, and resources to help them regain
                stability in their lives. Meanwhile, our alliance with food
                banks plays a crucial role in combating food insecurity. By
                donating and distributing food, we help to ensure that everyone
                has access to nutritious meals, regardless of their financial
                situation.
              </p>
              <Link
                to="/contact"
                className="text-green-400 dark:text-green-400 hover:underline font-medium text-lg inline-flex items-center"
              >
                Find out how
                <svg
                  className="w-4.5 h-3.5 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
              <div className="flex">
                <img className="mr-12 w-30 h-36" src={socks} />
                {/* <img className="mr-2 w-30 h-36" src={donate} /> */}
                <img className="mr-18 w-30 h-36" src={Hygiene1} />
              </div>
            </div>
            <div className="bg-gray-800 dark:bg-gray-800 border border-gray-400 dark:border-gray-400 rounded-lg p-8 md:p-12">
              <Link
                to="/contact"
                className="bg-purple-500 text-purple-800 text-xs font-bold inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-purple-500 dark:text-purple-800 mb-2"
              >
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
              </Link>
              <h2 className="text-white dark:text-white text-2xl font-extrabold mb-2">
                To learn more about our partnerships and how you can get
                involved, please visit our contact page.
              </h2>
              <p className="text-lg font-normal text-white dark:text-white mb-4">
                There, you will find more detailed information about us and how
                to join our mission, including a way to leave your email and
                contact information. You can also let us know if you wish to
                contribute to our efforts by donating food, clothing, or funds.
                By supporting this organization, you are making a tangible
                difference in the lives of those in need and helping to build a
                stronger, more compassionate community. Like a drop of water in
                a vast ocean, each of us causes ripples as we move through our
                lives. The full impact of what we have done may never be clear
                to us because those ripples spread out far beyond us. Thus we
                need to be conscious at all times of our place in the ocean of
                humanity and remember- "When we join together, We can swell the
                tide for the benefit for all."
              </p>
              <Link
                to="/contact"
                className="text-blue-600 dark:text-blue-600 hover:underline font-medium text-lg inline-flex items-center"
              >
                Contact Us
                <svg
                  className="w-4.5 h-3.5 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
              <div className="flex">
                <img className="mr-12 w-30 h-36" src={help} />
                {/* <img className="mr-2 w-22 h-36" src={hands} /> */}
                <img className="mr-18 w-30 h-36" src={help2} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
