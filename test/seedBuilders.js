import "dotenv/config";
// import { generateFakeBuilders } from "./generateFakeBuilders.js";
import axios from "axios";

// const seedBuilders = generateFakeBuilders(1)
const seedBuilders = [
  {
    projectType: "Upcoming Event",
    roles: ["Local Missions"],
    tasks: [
      {
        taskName: "Contacts",
      },
      {
        taskName: "Inventory",
      },
      {
        taskName: "Events",
      },
      {
        taskName: "Outreach",
      },
    ],
    user: 
      {
        firstName: "Joanne",

        lastName: "Liszewski",

        email: "jliszewski@perseverenow.org",

        username: "joski2025",

        roles: "ProjectManager",
      },
   
  },
  {
    projectType: "Volunteer Training",
    roles: ["Helping Hands Handler"],
    tasks: [
      {
        taskName: "Contacts",
      },
      {
        taskName: "Inventory",
      },
      {
        taskName: "Events",
      },
      {
        taskName: "Outreach",
      },
    ],
    user: 
      {
        firstName: "Joanne",

        lastName: "Liszewski",

        email: "jliszewski@perseverenow.org",

        username: "joski2025",

        roles: "ProjectManager",
      },
   
  },
  {
    projectType: "Recieving and Inventory",
    roles: ["Inventory and Control"],
    tasks: [
      {
        taskName: "Contacts",
      },
      {
        taskName: "Inventory",
      },
      {
        taskName: "Events",
      },
      {
        taskName: "Outreach",
      },
    ],
    user:
      {
        firstName: "Joanne",

        lastName: "Liszewski",

        email: "jliszewski@perseverenow.org",

        username: "joski2025",

        roles: "ProjectManager",
      },
  
  },
  {
    projectType: "Corporate Partnership Drive",
    roles: ["Corporate Sponsor Outreach"],
    tasks: [
      {
        taskName: "Contacts",
      },
      {
        taskName: "Inventory",
      },
      {
        taskName: "Events",
      },
      {
        taskName: "Outreach",
      },
    ],
    user:
      {
        firstName: "Joanne",

        lastName: "Liszewski",

        email: "jliszewski@perseverenow.org",

        username: "joski2025",

        roles: "ProjectManager",
      },
   
  },
];
console.log("seedBuilders", seedBuilders);

seedBuilders.forEach(async (builder) => {
  const addBuilder = await axios.post(
    `${process.env.SERVER_URL}/builders`,
    builder
  );
  console.log("addBuilder", addBuilder.data);
});
