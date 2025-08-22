import { faker } from "@faker-js/faker"

const generateFakeUser = () => {
  return {
   firstName: faker.person.firstName(),
   lastName: faker.person.lastName(),
   email: faker.internet.email(),
   username: faker.internet.username(),
   password: faker.string.alpha(4),
   roles: faker.helpers.arrayElement([ "Local Missions", "Inventory and Control", "Helping Hands Handler", "Corporate Sponsor Outreach" ])  
   }
}


export const generateFakeUsers = (length) => {
    const users = []
    Array.from({ length: length }).forEach(() => {
        users.push(generateFakeUser())
    })
    return users
}

