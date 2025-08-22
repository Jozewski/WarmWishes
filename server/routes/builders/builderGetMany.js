import builderModel from "../../schemas/builderModel.js"

const builderGetMany = async (req, res) => {
 
    const getBuilders = await builderModel.find()
    console.log("getBuilders", getBuilders)
    res.status(200).json({ "success": true, "builders": getBuilders })
 
}
export default builderGetMany