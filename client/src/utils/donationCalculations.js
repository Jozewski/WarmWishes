/**
 * Calculate total donations across all datasets
 * @param {Array} datasets - Array of dataset objects
 * @returns {number} - Total number of donated items
 */
export const calculateTotalDonations = (datasets) => {
  if (!datasets || !Array.isArray(datasets) || datasets.length === 0) {
    return 0
  }

  let total = 0

  datasets.forEach(dataset => {
    if (dataset.items && Array.isArray(dataset.items)) {
      dataset.items.forEach(item => {
        total += item.current || 0
      })
    }
  })

  return total
}

/**
 * Format donation total with commas
 * @param {number} total - Total donation count
 * @returns {string} - Formatted string (e.g., "69,140")
 */
export const formatDonationTotal = (total) => {
  return total.toLocaleString()
}
