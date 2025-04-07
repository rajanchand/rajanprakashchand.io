
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
      resolve('Geolocation not supported');
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve(`Latitude: ${latitude}, Longitude: ${longitude}`);
      },
      () => {
        resolve('Location permission denied');
      },
      { timeout: 5000 }
    );
  });
};

/**
 * Enriches form data with system information
 * @param formData The original form data
 * @returns Promise with the enriched form data
 */
export const enrichFormData = async (formData: ContactFormData): Promise<ContactFormData> => {
  const [ipAddress, location] = await Promise.all([
    getIpAddress(),
    getLocationInfo(),
  ]);
  
  const { deviceInfo, osInfo, browserInfo } = getDeviceInfo();
  
  return {
    ...formData,
    ipAddress,
    location,
    deviceInfo,
    osInfo,
    browserInfo
  };
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
    formDataToSend.append(key, value);
  });
  
  // Send data to Google Sheets
  return fetch(scriptURL, {
    method: 'POST',
    body: formDataToSend
  });
};
