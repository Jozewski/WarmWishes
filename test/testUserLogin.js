import "dotenv/config"
import axios from "axios"

const users = [  
   
  {
    firstName: 'Reginald',
    lastName: 'Will',
    email: 'Waldo_Paucek@gmail.com',
    username: 'Andre91',
    password: 'rJYu',
    roles: 'Corporate Sponsor Outreach'
  },
  {
    firstName: 'Joanne',
    lastName: 'Liszewski',
    email: 'jliszewski@perseverenow.org',
    username: 'joski2025',
    password: 'aTFP',
    roles: 'Project Manager'
  },
  {
    firstName: 'Pasquale',
    lastName: "O'Conner",
    email: 'Dock_Stokes74@hotmail.com',
    username: 'Destinee.Wyman',
    password: 'LNqC',
    roles: 'Corporate Sponsor Outreach'
  },
  {
    firstName: 'Jamar',
    lastName: 'Heaney',
    email: 'Abdullah_Beier20@gmail.com',
    username: 'Chauncey.Ernser',
    password: 'hYED',
    roles: 'Helping Hands Handler'
  },
  {
    firstName: 'Ayla',
    lastName: 'Botsford',
    email: 'Fern_Cremin19@gmail.com',
    username: 'Elsa.Collins',
    password: 'Mevq',
    roles: 'Inventory and Control'
  },
  {
    firstName: 'Grayce',
    lastName: 'Rippin',
    email: 'Werner_Murazik9@hotmail.com',
    username: 'Beth_DuBuque',
    password: 'PaZc',
    roles: 'Inventory and Control'
  },
  {
    firstName: 'Veronica',
    lastName: 'Greenfelder',
    email: 'Ignatius76@yahoo.com',
    username: 'Walton_Green',
    password: 'tJup',
    roles: 'Corporate Sponsor Outreach'
  },
  {
    firstName: 'Charlene',
    lastName: 'Macejkovic',
    email: 'Torrance30@hotmail.com',
    username: 'Laury.Bogan-Bayer',
    password: 'hgzw',
    roles: 'Local Missions'
  },
  {
    firstName: 'Marilou',
    lastName: 'Vandervort',
    email: 'Elta_Stamm4@gmail.com',
    username: 'Lesley_Hane',
    password: 'pzOj',
    roles: 'Helping Hands Handler'
  },
  {
    firstName: 'Flossie',
    lastName: 'Lynch',
    email: 'Leopoldo92@hotmail.com',
    username: 'Ellie.Lehner',
    password: 'JGpz',
    roles: 'Inventory and Control'
  },
  {
    firstName: 'Cielo',
    lastName: 'Considine',
    email: 'Antonina.Klocko96@gmail.com',
    username: 'Retha.Lehner89',
    password: 'ncJz',
    roles: 'Corporate Sponsor Outreach'
  },
  {
    firstName: 'Lela',
    lastName: 'Murphy',
    email: 'Isobel.Thompson55@hotmail.com',
    username: 'Hershel14',
    password: 'nkNZ',
    roles: 'Local Missions'
  },
  {
    firstName: 'Donavon',
    lastName: 'Hodkiewicz-Lueilwitz',
    email: 'Theresia.Gutmann@yahoo.com',
    username: 'Kassandra_Durgan88',
    password: 'kxwZ',
    roles: 'Inventory and Control'
  },
  {
    firstName: 'Gerry',
    lastName: 'Russel',
    email: 'Kenyon58@gmail.com',
    username: 'Dagmar.Cremin85',
    password: 'XhMm',
    roles: 'Helping Hands Handler'
  }
    
 
]

const loginUser = await axios.post(`${process.env.SERVER_URL}/users/login`, { email: users[0].email, password: users[0].password })
console.log("loginUser", loginUser)

