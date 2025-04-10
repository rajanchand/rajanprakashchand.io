
import { ContactFormData } from './types/contactFormTypes';
import { getDeviceInfo } from './services/deviceInfoService';
import { getIpAddress, getLocationInfo, getLocationName } from './services/locationService';
import { getWeatherInfo } from './services/weatherService';
import { sendContactFormToGoogleSheets as sendToSheets } from './services/googleSheetsService';

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
export const sendContactFormToGoogleSheets = (formData: ContactFormData): Promise<Response> => {
  return sendToSheets(formData);
};
