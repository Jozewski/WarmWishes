import { faker } from "@faker-js/faker"

const generateFakeContact = () => {
  return {
   firstName: faker.person.firstName(),
   lastName: faker.person.lastName(),
   email: faker.internet.email(),
   phone:faker.phone.number(),
   projectType: faker.helpers.arrayElement(["Upcoming Event", "Recieving and Inventory", "Volunteer Training", "Corporate Partnership Drive" ], { min: 1, max: 1 }),
   message:faker.word.words({ count: { min: 15, max: 20 } })    
   }
}


export const generateFakeContacts = (length) => {
    const Contacts = []
    Array.from({ length: length }).forEach(() => {
        Contacts.push(generateFakeContact())
    })
    return Contacts
}