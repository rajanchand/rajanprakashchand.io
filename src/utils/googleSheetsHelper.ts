interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  ipAddress?: string;
  deviceInfo?: string;
  osInfo?: string;
  browserInfo?: string;
  location?: string;
  weather?: string;
  timestamp?: string;
}

/**
 * Gets the user's IP address from a public API
 * @returns Promise with the IP address
 */
const getIpAddress = async (): Promise<string> => {
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
 * Gets the user's device information
 * @returns Object with device information
 */
const getDeviceInfo = (): { deviceInfo: string; osInfo: string; browserInfo: string } => {
  const userAgent = navigator.userAgent;
  
  // Get browser information
  let browserInfo = 'Unknown Browser';
  if (userAgent.indexOf('Firefox') > -1) {
    browserInfo = 'Firefox';
  } else if (userAgent.indexOf('Chrome') > -1) {
    browserInfo = 'Chrome';
  } else if (userAgent.indexOf('Safari') > -1) {
    browserInfo = 'Safari';
  } else if (userAgent.indexOf('Edge') > -1) {
    browserInfo = 'Edge';
  } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident/') > -1) {
    browserInfo = 'Internet Explorer';
  }
  
  // Get OS information
  let osInfo = 'Unknown OS';
  if (userAgent.indexOf('Windows') > -1) {
    osInfo = 'Windows';
  } else if (userAgent.indexOf('Mac') > -1) {
    osInfo = 'MacOS';
  } else if (userAgent.indexOf('Linux') > -1) {
    osInfo = 'Linux';
  } else if (userAgent.indexOf('Android') > -1) {
    osInfo = 'Android';
  } else if (userAgent.indexOf('iOS') > -1 || userAgent.indexOf('iPhone') > -1 || userAgent.indexOf('iPad') > -1) {
    osInfo = 'iOS';
  }
  
  // Get device type
  let deviceInfo = 'Desktop';
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
    deviceInfo = 'Tablet';
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
    deviceInfo = 'Mobile';
  }
  
  return { deviceInfo, osInfo, browserInfo };
};

/**
 * Gets the user's location information if available
 * @returns Promise with location information
 */
const getLocationInfo = (): Promise<string> => {
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
const getLocationName = async (location: string): Promise<string> => {
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

/**
 * Gets current weather information based on coordinates
 * @param coords Latitude and longitude
 * @returns Promise with weather information
 */
const getWeatherInfo = async (location: string): Promise<string> => {
  try {
    // Extract coordinates if available
    const coordsMatch = location.match(/Latitude: ([\d.-]+), Longitude: ([\d.-]+)/);
    
    if (!coordsMatch) {
      return 'Weather unavailable';
    }
    
    const latitude = coordsMatch[1];
    const longitude = coordsMatch[2];
    
    // Use OpenMeteo free weather API instead of OpenWeatherMap (which reached request limit)
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`
    );
    
    if (!response.ok) {
      throw new Error('Weather API error');
    }
    
    const data = await response.json();

    // Get the temperature and format it to show in Celsius
    const temperature = data.current?.temperature_2m;
    const weatherUnit = data.current_units?.temperature_2m || '°C';
    
    // Map the weather code to a condition
    const weatherCode = data.current?.weather_code;
    let weatherCondition = 'Unknown';
    
    // Weather code mapping based on WMO codes
    if (weatherCode !== undefined) {
      if (weatherCode === 0) weatherCondition = 'Clear sky';
      else if (weatherCode === 1) weatherCondition = 'Mainly clear';
      else if (weatherCode === 2) weatherCondition = 'Partly cloudy';
      else if (weatherCode === 3) weatherCondition = 'Overcast';
      else if ([45, 48].includes(weatherCode)) weatherCondition = 'Foggy';
      else if ([51, 53, 55, 56, 57].includes(weatherCode)) weatherCondition = 'Drizzle';
      else if ([61, 63, 65, 66, 67].includes(weatherCode)) weatherCondition = 'Rain';
      else if ([71, 73, 75, 77].includes(weatherCode)) weatherCondition = 'Snow';
      else if ([80, 81, 82].includes(weatherCode)) weatherCondition = 'Rain showers';
      else if ([85, 86].includes(weatherCode)) weatherCondition = 'Snow showers';
      else if ([95, 96, 99].includes(weatherCode)) weatherCondition = 'Thunderstorm';
      else weatherCondition = 'Unknown';
    }
    
    return `${weatherCondition}, ${temperature}${weatherUnit}`;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return 'Weather unavailable';
  }
};

/**
 * Enriches form data with system information
 * @param formData The original form data
 * @returns Promise with the enriched form data
 */
export const enrichFormData = async (formData: ContactFormData): Promise<ContactFormData> => {
  const location = await getLocationInfo();
  const [ipAddress, locationName, weather] = await Promise.all([
    getIpAddress(),
    getLocationName(location),
    getWeatherInfo(location),
  ]);
  
  const { deviceInfo, osInfo, browserInfo } = getDeviceInfo();
  
  return {
    ...formData,
    ipAddress,
    location: locationName,
    weather,
    deviceInfo,
    osInfo,
    browserInfo,
    timestamp: new Date().toISOString()
  };
};

/**
 * Fetches current weather based on geolocation
 * @returns Promise with current location and weather
 */
export const getCurrentLocationAndWeather = async (): Promise<{location: string, weather: string}> => {
  try {
    const location = await getLocationInfo();
    const [locationName, weather] = await Promise.all([
      getLocationName(location),
      getWeatherInfo(location),
    ]);
    
    return { location: locationName, weather };
  } catch (error) {
    console.error('Error getting location and weather:', error);
    return { location: 'Location unavailable', weather: 'Weather unavailable' };
  }
};

/**
 * Sends contact form data to Google Sheets via a Google Apps Script web app
 * @param formData The form data to send
 * @returns Promise with the fetch response
 */
export const sendContactFormToGoogleSheets = async (formData: ContactFormData): Promise<Response> => {
  // Google Apps Script web app URL
  const scriptURL = 'https://script.google.com/macros/s/AKfycbwxtLkA26bdnV6eMgh27bwSgT4_zWkkkCo4oDgguQNT7-PZJLtWs_UAxyN51-NAHzAB/exec';
  
  // Create FormData object for sending
  const formDataToSend = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    formDataToSend.append(key, value || 'Not available');
  });
  
  // Send data to Google Sheets
  return fetch(scriptURL, {
    method: 'POST',
    body: formDataToSend
  });
};
