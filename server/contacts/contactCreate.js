
import { createContact } from "../database/helpers.js"

const contactCreate = async (req, res) => {
    const {firstName, lastName, email, phone, projectType, message } = req.body
   // Validation
   if (
     (!firstName || firstName == "") ||
     (!lastName || lastName == "") ||
     (!email || email == "") ||
     (!phone || phone == "") ||
     (!projectType || projectType == "") ||
     (!message || message == "")

   ) {
    res.status(500).json({ "message": "contact information not valid."})
   }
   else{
    try {
      const newcontact = createContact({ firstName, lastName, email, phone, projectType, message })
      res.status(200).json({ "success": true, "message": "contact created." })
    } catch (error) {
      res.status(500).json({ "success": false, "message": "Failed to create contact." })
    }
   }
}

export default contactCreate