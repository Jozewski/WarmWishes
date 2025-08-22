import { faker } from "@faker-js/faker";

export const generateFakeDataSet = () => {
  return {
    projectName: faker.helpers.arrayElement(
      [
        "All in For Fall",
        "Warm Up for Winter",
        "Spring Fling",
        "Hydration Stations",
      ],
      { min: 1, max: 1 }
    ),
    items:[{description:faker.helpers.arrayElement(
      [
        "Blankets",
        "Winter Coats",
        "Beanies",
        "Gloves",
        "Thermals",
        "Sleeping Bags",        
        "Tarps",
        "Tents",
        "Bottled Water",
        "Hygienes Kits",
        "Clothing, other"

      ],
      { min: 11, max: 11 }
    ),

    }], 

    weekly: faker.number.int({ min: 10, max: 100, multipleOf: 10 }), // 50  
    monthly: faker.number.int({ min: 110, max: 150, multipleOf: 10 }), // 50 
    quarterly: faker.number.int({ min: 200, max: 210, multipleOf: 10 }), // 50
    current: faker.number.int({ min: 1000, max: 1500, multipleOf: 10 }), // 50
    goal: faker.number.int({ min: 1500, max: 2000, multipleOf: 10 }) // 50

  };
};

export const generateFakeDataSets = (length) => {
  const dataSets = [];
  Array.from({ length: length }).forEach(() => {
    dataSets.push(generateFakeDataSet());
  });
  return dataSets;
};
