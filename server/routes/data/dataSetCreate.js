
import { createDataset } from "../../database/helpers.js"

const dataSetCreate = async (req, res) => {
    const {projectName, items} = req.body
   // Validation

    try {
      const newDataSet = createDataset({ projectName, items })
      res.status(200).json({ "success": true, "message": "dataSet created." })
    } catch (error) {
      res.status(500).json({ "success": false, "message": "Failed to create dataset." })
    }
}

export default dataSetCreate