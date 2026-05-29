import builderModel from "../../schemas/builderModel.js"

const builderGetMany = async (req, res) => {

    const getBuilders = await builderModel.find()
    res.status(200).json({ "success": true, "builders": getBuilders })
 
}
export default builderGetMany