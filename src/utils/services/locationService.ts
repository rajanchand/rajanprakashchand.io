
/**
 * Gets the user's IP address from a public API
 * @returns Promise with the IP address
 */
export const getIpAddress = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error fetching IP address:', error);
    return 'Unknown';
  }
};

/**
 * Gets the user's location information if available
 * @returns Promise with location information
 */
export const getLocationInfo = (): Promise<string> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve('Location unavailable');
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve(`Latitude: ${latitude}, Longitude: ${longitude}`);
      },
      () => {
        resolve('Location unavailable');
      },
      { timeout: 5000 }
    );
  });
};

/**
 * Gets location name based on coordinates using reverse geocoding
 * @param location The location string with coordinates
 * @returns Promise with the location name
 */
export const getLocationName = async (location: string): Promise<string> => {
  try {
    // Extract coordinates if available
    const coordsMatch = location.match(/Latitude: ([\d.-]+), Longitude: ([\d.-]+)/);
    
    if (!coordsMatch) {
      return 'Location unavailable';
    }
    
    const latitude = coordsMatch[1];
    const longitude = coordsMatch[2];
    
    // Use a free geocoding API
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    
    if (!response.ok) {
      throw new Error('Geocoding API error');
    }
    
    const data = await response.json();
    
    // Format the location based on available data
    let locationName = 'Unknown location';
    
    if (data.address) {
      const city = data.address.city || data.address.town || data.address.village || data.address.hamlet;
      const country = data.address.country;
      
      if (city && country) {
        locationName = `${city}, ${country}`;
      } else if (city) {
        locationName = city;
      } else if (country) {
        locationName = country;
      }
    }
    
    return locationName;
  } catch (error) {
    console.error('Error getting location name:', error);
    return 'Location unavailable';
  }
};
