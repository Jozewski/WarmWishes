import { getProjectById, getDatasetByProjectName, updateDataset, getAllDatasets } from "../../database/helpers.js"

/**
 * Syncs project donations to the corresponding dataset
 * Updates the "current" value in dataset items based on total donations
 */
const syncDonationsToDataset = async (projectId) => {
  try {
    // Get the project with all donations
    const project = getProjectById(projectId)

    if (!project) {
      throw new Error("Project not found")
    }

    // Find the corresponding dataset by project name (case-insensitive)
    const dataset = getDatasetByProjectName(project.projectName)

    if (!dataset) {
      const allDatasets = getAllDatasets()
      console.error(`No dataset found for project: ${project.projectName}`)
      console.error(`Available datasets: ${allDatasets.map(d => d.projectName).join(', ')}`)
      return null
    }

    console.log(`✓ Syncing donations from project "${project.projectName}" to dataset "${dataset.projectName}"`)

    // Aggregate donations by item type
    const donationTotals = {}
    project.donations.forEach(donation => {
      const itemName = donation.donatedItem.toLowerCase().trim()
      donationTotals[itemName] = (donationTotals[itemName] || 0) + donation.numberOfItems
    })

    console.log(`  Donation totals to sync:`, donationTotals)

    // Update dataset items with current donation totals
    let matchedItems = 0
    const updatedItems = dataset.items.map(item => {
      const itemDescription = item.description.toLowerCase().trim()

      // Try to match donation items to dataset items by description
      for (const [donationItem, total] of Object.entries(donationTotals)) {
        if (itemDescription.includes(donationItem) || donationItem.includes(itemDescription)) {
          const oldValue = item.current
          matchedItems++
          console.log(`  ✓ Matched "${donationItem}" to dataset item "${item.description}": ${oldValue} → ${total}`)
          return {
            ...item,
            current: total,
            lastUpdate: new Date().toISOString().split('T')[0]
          }
        }
      }
      return item
    })

    if (matchedItems === 0) {
      console.warn(`  ⚠ Warning: No donation items matched dataset items. Check item names.`)
      console.warn(`  Dataset items:`, dataset.items.map(i => i.description))
    }

    // Save the updated dataset
    updateDataset(dataset.id, { items: updatedItems })
    console.log(`✓ Dataset saved successfully. ${matchedItems} items updated.`)

    return getDatasetByProjectName(project.projectName)
  } catch (error) {
    console.error("Error syncing donations to dataset:", error)
    throw error
  }
}

export default syncDonationsToDataset
