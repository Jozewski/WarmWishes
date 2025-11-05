import projectModel from "../../schemas/projectModel.js"

const projectDonationUpdate = async (req, res) => {
  const { projectId } = req.params
  const { donations, category, status, description } = req.body

  // Validation
  if (!projectId || projectId === "") {
    return res.status(400).json({ message: "Project ID is required." })
  }

  if (!donations || !Array.isArray(donations) || donations.length === 0) {
    return res.status(400).json({ message: "Donations array is required and must not be empty." })
  }

  try {
    // Calculate total items
    const totalItems = donations.reduce((sum, donation) => {
      return sum + (parseInt(donation.numberOfItems) || 0)
    }, 0)

    // Prepare donation summary
    const donationSummary = {
      totalItems,
      lastUpdated: new Date(),
      description: description || ""
    }

    // Update project with new donations
    const updateProject = await projectModel.updateOne(
      { _id: projectId },
      {
        $push: { donations: { $each: donations } },
        donationSummary,
        ...(category && { category }),
        ...(status && { status })
      }
    )

    if (updateProject.modifiedCount === 0) {
      return res.status(404).json({ message: "Project not found or no changes made." })
    }

    // Get updated project
    const updatedProject = await projectModel.findById(projectId)

    res.status(200).json({
      success: true,
      message: "Donations updated successfully.",
      project: updatedProject
    })
  } catch (error) {
    console.error("Error updating donations:", error)
    res.status(500).json({ message: "Error updating donations.", error: error.message })
  }
}

export default projectDonationUpdate
