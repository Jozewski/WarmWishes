import { getProjectById, addDonationsToProject, updateProject } from "../../database/helpers.js"
import syncDonationsToDataset from "./projectDonationSync.js"

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
    const pid = parseInt(projectId)

    // Check if project exists
    const existingProject = getProjectById(pid)
    if (!existingProject) {
      return res.status(404).json({ message: "Project not found." })
    }

    // Calculate total items
    const totalItems = donations.reduce((sum, donation) => {
      return sum + (parseInt(donation.numberOfItems) || 0)
    }, 0)

    // Add donations to project
    addDonationsToProject(pid, donations)

    // Update project with donation summary and optional fields
    const updates = {
      donationSummary: {
        totalItems,
        lastUpdated: new Date().toISOString(),
        description: description || ""
      }
    }

    if (status) updates.status = status

    updateProject(pid, updates)

    // Get updated project
    const updatedProject = getProjectById(pid)

    // Sync donations to dataset for real-time dashboard updates
    try {
      await syncDonationsToDataset(pid)
    } catch (syncError) {
      console.error("Failed to sync donations to dataset:", syncError)
      // Don't fail the request if sync fails
    }

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
