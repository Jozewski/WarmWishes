import { getAllDatasets } from "../../database/helpers.js"

const dataSetGetMany = async (req, res) => {
  const dataSets = getAllDatasets()
  res.status(200).json({ "success": true, dataSets: dataSets })
}

export default dataSetGetMany