import projectModel from "../../schemas/projectModel.js"
import dataSetModel from "../data/dataSetModel.js"

/**
 * Syncs project donations to the corresponding dataset
 * Updates the "current" value in dataset items based on total donations
 */
const syncDonationsToDataset = async (projectId) => {
  try {
    // Get the project with all donations
    const project = await projectModel.findById(projectId)

    if (!project) {
      throw new Error("Project not found")
    }

    // Find the corresponding dataset by project name
    const dataset = await dataSetModel.findOne({ projectName: project.projectName })

    if (!dataset) {
      console.error(`No dataset found for project: ${project.projectName}`)
      return null
    }

    // Aggregate donations by item type
    const donationTotals = {}
    project.donations.forEach(donation => {
      const itemName = donation.donatedItem.toLowerCase().trim()
      donationTotals[itemName] = (donationTotals[itemName] || 0) + donation.numberOfItems
    })

    // Update dataset items with current donation totals
    dataset.items.forEach(item => {
      const itemDescription = item.description.toLowerCase().trim()

      // Try to match donation items to dataset items by description
      for (const [donationItem, total] of Object.entries(donationTotals)) {
        if (itemDescription.includes(donationItem) || donationItem.includes(itemDescription)) {
          item.current = total
          item.lastUpdate = new Date().toISOString().split('T')[0]
        }
      }
    })

    // Save the updated dataset
    await dataset.save()

    return dataset
  } catch (error) {
    console.error("Error syncing donations to dataset:", error)
    throw error
  }
}

export default syncDonationsToDataset
