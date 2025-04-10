
/**
 * Gets the user's device information
 * @returns Object with device information
 */
export const getDeviceInfo = (): { deviceInfo: string; osInfo: string; browserInfo: string } => {
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
