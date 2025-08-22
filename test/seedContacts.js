import "dotenv/config"
import { generateFakeContacts } from "./generateFakeContacts.js";
import axios from "axios"

const seedContacts = generateFakeContacts(45)
console.log("seedContacts", seedContacts)

seedContacts.forEach(async (contact) => {
    const addContact = await axios.post(`${process.env.SERVER_URL}/contacts`, contact)
    console.log("addContact", addContact.data )
    
})
