import contactModel from "./contactModel.js"

const contactGetMany = async (req, res) => {
  const contactList = await contactModel.find()
  console.log("contactList", contactList)
  res.status(200).json({ "success": true, contacts: contactList })

}

export default contactGetMany