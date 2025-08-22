import "dotenv/config"
import { generateFakeUsers } from "./generateFakeUsers.js";
import axios from "axios"

const seedUsers = generateFakeUsers(5)
console.log("seedUsers", seedUsers)

seedUsers.forEach(async (user) => {
    const addUser = await axios.post(`${process.env.SERVER_URL}/users`, user)
    console.log("addUser", addUser.data )
    
})




