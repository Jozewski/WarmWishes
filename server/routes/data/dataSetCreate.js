
import dataSetModel from "./dataSetModel.js"

const dataSetCreate = async (req, res) => {
    const {projectName, items} = req.body
   // Validation

   
    const newDataSet = await dataSetModel.create({ projectName, items })
    res.status(200).json({ "success": true, "message": "dataSet created." })
   
}

export default dataSetCreate