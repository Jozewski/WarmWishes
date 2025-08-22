import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import TwoLevelPieChart from "./TwoLevelPieChart";



const DashboardPM = () => {
  const navigate = useNavigate();


  const { datasets } = useSelector((state) => state.datasets);


  console.log("dataSets", datasets);

  return (
    <>
      <div className="bg-slate-500 dark:bg-slate-500 p-4 sm:ml-64">
        <div className="p-14 border-2 border-gray-600 border-dashed rounded-lg dark:border-gray-700 ">
          <div className="flex items-center justify-center h-10 mb-4 rounded bg-slate-500 dark:bg-slate-500">
            <p className="text-2xl text-gray-500 dark:text-gray-500">
              <button
                onClick={() => navigate("/project-create")}
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xlg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Create a Project
              </button>
            </p>
          </div>
          <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <TwoLevelPieChart />

            <div class="mt-6 sm:mt-8 lg:mt-0">
              <h1 class="text-xl font-semibold text-white sm:text-2xl dark:text-white">
              This Two-Level Pie Chart provides a clear view of our current donation progress for each Project. The central portion highlights the total donations received by every project, offering a quick snapshot of our  efforts.


                Combined total for all Projects to date is...
              </h1>

              <hr class="my-6 md:my-8 border-gray-800 dark:border-gray-800" />
              <div class="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p class="text-2xl font-extrabold text-white sm:text-3xl dark:text-white">
                  69,140 😊 DONATED ITEMS SO FAR 😊
                </p>
              </div>

              <hr class="my-6 md:my-8 border-gray-800 dark:border-gray-800" />

              <p class="mb-6 text-gray-100 dark:text-gray-100">
                The double-ring infographic visually presents donation data. The
                outer ring breaks down contributions by quarter, showcasing how
                much was donated towards each specific need. The detailed table
                beneath the chart provides further information about every item
                listed, including its current status and total donation goal.
                This combination of visual representation and comprehensive
                details allows for a clear understanding of both the overall
                progress and individual needs within each of the Projects.
              </p>
            </div>
          </div>

          <div className="flex items-justify justify-center h-144 mb-4 rounded bg-gray-800 dark:bg-gray-800">
            <div className="relative overflow gray-800 shadow-md dark:bg-gray-800 sm:rounded-lg">
              <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                <div className="flex items-center flex-1 space-x-4">
                  <span className="text-gray-500"> </span>
                  <div
                    className="inline-block w-4 h-4 mr-2 bg-blue-300
 rounded-full"
                  ></div>{" "}
                  <span className="bg-primary-100 text-primary-800 font-medium  py-2 font-medium text-white whitespace-nowrap dark:text-white">
                    {datasets[3].projectName}
                  </span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-white uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="bg-gray-700 dark:bg-gray-700">
                    
                      <th scope="col" className="px-4 py-3">
                        ITEM
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Description
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Project Status
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Weekly
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Monthly
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Quarterly
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Current
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Goal
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Last Update
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {datasets[3].items.map((item)=>(
                      
                    <tr className="border-b dark:border-gray-600 hover:bg-gray-500 dark:hover:bg-gray-700">
                     
                      <th
                        scope="row"
                        className="flex items-center px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white"
                      >
                        <img className="w-auto h-8 mr-3"  src={
                      new URL( `../assets/images/${item.image}`, import.meta.url).href
                    }  alt=""
                    />

                      </th>
                      <td className="px-4 py-2">
                        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                          {item.description}
                        </span>
                      </td>
                      <td className="px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          <div
                            className="inline-block w-4 h-4 mr-2 bg-blue-300
 rounded-full"
                          ></div>
                          Upcoming
                        </div>
                      </td>
                      <td className="px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                      {item.weekly}
                      </td>
                      <td className="px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                      {item.monthly}
                      </td>
                      <td className="px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          <span className="x-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                          {item.quarterly}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                        {item.current}
                          </div>
                      </td>
                      <td className="x-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                      {item.goal}
                      </td>
                      <td className="px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                      {item.lastUpdate}
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center flex-1 space-x-4">
                <span className="text-gray-500"> </span>
                <div
                  className="inline-block w-4 h-4 mr-2 bg-purple-400 
rounded-full"
                ></div>

                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                {datasets[1].projectName}
                </span>
                <span className="text-white dark:text-white"> </span>
              </div>
              <div className="flex items-center flex-1 space-x-4">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-white uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="bg-gray-700 dark:bg-gray-700">
                    
                      <th scope="col" className="px-4 py-3">
                        ITEM
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Description
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Project Status
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Weekly
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Monthly
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Quarterly
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Current
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Goal
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Last Update
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {datasets[1].items.map((item)=>(
                    <tr className="border-b dark:border-gray-600 hover:bg-gray-500 dark:hover:bg-gray-700">
                     
                      <th
                        scope="row"
                        className="flex items-center px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white"
                      >
                        <img className="w-auto h-8 mr-3"  src={
                      new URL( `../assets/images/${item.image}`, import.meta.url).href
                    }  alt=""
                    />

                      </th>
                      <td className="px-4 py-2">
                        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                          {item.description}
                        </span>
                      </td>
                      <td className="px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                        <div
                            className="inline-block w-4 h-4 mr-2 bg-purple-400 
rounded-full"
                          ></div>
                          Under Developement
                        </div>
                      </td>
                      <td className="px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                      {item.weekly}
                      </td>
                      <td className="px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                      {item.monthly}
                      </td>
                      <td className="px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          <span className="x-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                          {item.quarterly}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                        {item.current}
                          </div>
                      </td>
                      <td className="x-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                      {item.goal}
                      </td>
                      <td className="px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                      {item.lastUpdate}
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center flex-1 space-x-4">
                <span className="text-gray-500"> </span>
                <div
                  className="inline-block w-4 h-4 mr-2 bg-green-300 
rounded-full"
                ></div>

                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                {datasets[2].projectName}
                </span>
                <span className="text-white dark:text-white"> </span>
              </div>
              <div className="flex items-center flex-1 space-x-4">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-white uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="bg-gray-700 dark:bg-gray-700">
                     
                      <th scope="col" className="px-4 py-3">
                        ITEM
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Description
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Project Status
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Weekly
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Monthly
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Quarterly
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Current
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Goal
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Last Update
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {datasets[2].items.map((item)=>(
                    <tr className="border-b dark:border-gray-600 hover:bg-gray-500 dark:hover:bg-gray-700">
                     
                      <th
                        scope="row"
                        className="flex items-center px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white"
                      >
                        <img className="w-auto h-8 mr-3"  src={
                      new URL( `../assets/images/${item.image}`, import.meta.url).href
                    }  alt=""
                    />

                      </th>
                      <td className="px-4 py-2">
                        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                          {item.description}
                        </span>
                      </td>
                      <td className="px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                        <div
                            className="inline-block w-4 h-4 mr-2 bg-green-300 
rounded-full"
                          ></div>
                          Being Deployed
                        </div>
                      </td>
                      <td className="px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                      {item.weekly}
                      </td>
                      <td className="px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                      {item.monthly}
                      </td>
                      <td className="px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          <span className="x-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                          {item.quarterly}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                        {item.current}
                          </div>
                      </td>
                      <td className="x-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                      {item.goal}
                      </td>
                      <td className="px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                      {item.lastUpdate}
                      </td>
                    </tr>
                    
                   
                     ))}
                  </tbody>
                
                </table>
              </div>
              <div className="flex items-center flex-1 space-x-4">
                <span className="text-gray-500"> </span>
                <div className="inline-block w-4 h-4 mr-2 bg-yellow-500 rounded-full"></div>

                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                {datasets[0].projectName}
                </span>
                <span className="text-white dark:text-white"> </span>
              </div>
              <div className="flex items-center flex-1 space-x-4">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-white uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
                    <tr className="bg-gray-700 dark:bg-gray-700">
                     
                      <th scope="col" className="px-4 py-3">
                        ITEM
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Description
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Project Status
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Weekly
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Monthly
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Quarterly
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Current
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Goal
                      </th>
                      <th scope="col" className="px-4 py-3">
                        Last Update
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {datasets[0].items.map((item)=>(
                    <tr className="border-b dark:border-gray-600 hover:bg-gray-500 dark:hover:bg-gray-700">
                     
                      <th
                        scope="row"
                        className="flex items-center px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white"
                      >
                        <img className="w-auto h-8 mr-3"  src={
                      new URL( `../assets/images/${item.image}`, import.meta.url).href
                    }  alt=""
                    />

                      </th>
                      <td className="px-4 py-2">
                        <span className="bg-primary-100 text-primary-800 text-xs font-medium px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                          {item.description}
                        </span>
                      </td>
                      <td className="px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                        <div
                            className="inline-block w-4 h-4 mr-2 bg-yellow-500 
rounded-full"
                          ></div>
                          Ongoing
                        </div>
                      </td>
                      <td className="px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                      {item.weekly}
                      </td>
                      <td className="px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                      {item.monthly}
                      </td>
                      <td className="px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          <span className="x-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                          {item.quarterly}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                        {item.current}
                          </div>
                      </td>
                      <td className="x-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                      {item.goal}
                      </td>
                      <td className="px-4 py-2 font-medium text-white whitespace-nowrap dark:text-white">
                      {item.lastUpdate}
                      </td>
                    </tr>
                    
                   

                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPM;

