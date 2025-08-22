import dataSetModel from "./dataSetModel.js"

const dataSetGetMany = async (req, res) => {
  const dataSets = await dataSetModel.find()
  console.log("dataSetList", dataSets)
  res.status(200).json({ "success": true, dataSets: dataSets })

}

export default dataSetGetMany