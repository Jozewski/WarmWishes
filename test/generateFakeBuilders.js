import { faker } from "@faker-js/faker"

const generateFakeBuilder = () => {
  return {
   projectType: faker.helpers.arrayElement([ "Local Missions", "Inventory and Control", "Helping Hands Handler", "Corporate Sponsor Outreach" ]) ,  
   tasks: faker.helpers.arrayElement(["Contacts", "Inventory", "Events"])
   }
}


export const generateFakeBuilders = (length) => {
    const builders = []
    Array.from({ length: length }).forEach(() => {
        builders.push(generateFakeBuilder())
    })
    return builders
}
