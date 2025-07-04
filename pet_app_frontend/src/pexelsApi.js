//
// Utility for interacting with the Pexels API for pet images.
//

// PUBLIC_INTERFACE
/**
 * Fetches pet-related images from the Pexels API.
 * @param {string} query - The search term for pet images (e.g. 'dog', 'cat')
 * @param {number} perPage - Number of images to return per page
 * @param {number} page - Page number of results to fetch
 * @returns {Promise<Object>} - Promise resolving to Pexels API response or throws on failure
 */
export async function fetchPetImages(query = "cute pet", perPage = 15, page = 1) {
  /** Fetches images from Pexels API with proper API key management.
   * Uses the API key stored in REACT_APP_PEXELS_API_KEY environment variable.
   */
  const apiKey = process.env.REACT_APP_PEXELS_API_KEY;
  if (!apiKey) {
    throw new Error("Pexels API key is missing. Make sure REACT_APP_PEXELS_API_KEY is set.");
  }

  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`;

  const response = await fetch(url, {
    headers: {
      Authorization: apiKey
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Pexels API error: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const data = await response.json();
  return data;
}
