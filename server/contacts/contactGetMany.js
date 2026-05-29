import { getAllContacts } from "../database/helpers.js"

const contactGetMany = async (req, res) => {
  const contactList = getAllContacts()
  res.status(200).json({ "success": true, contacts: contactList })
}

export default contactGetMany