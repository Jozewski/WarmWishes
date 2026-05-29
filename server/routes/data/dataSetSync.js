import { getDatasetsByProjectName } from "../../database/helpers.js"

const dataSetSync = async (req, res) => {
  try {
    const { projectName } = req.body || {}

    if (!projectName) {
      return res.status(400).json({
        success: false,
        message: "projectName is required",
      })
    }

    const datasets = getDatasetsByProjectName(projectName)

    res.json({
      success: true,
      data: datasets,
    })
  } catch (error) {
    console.error("Dataset sync error:", error)
    res.status(500).json({
      success: false,
      message: error.message || "Error syncing dataset",
    })
  }
}

export default dataSetSync
