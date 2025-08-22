
import contactModel from "./contactModel.js"

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

   
    const newcontact = await contactModel.create({ firstName, lastName, email, phone, projectType, message })
    console.log("newcontact", newcontact)
    res.status(200).json({ "success": true, "message": "contact created." })
   }
}

export default contactCreate