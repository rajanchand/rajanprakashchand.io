
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Sends contact form data to Google Sheets via a Google Apps Script web app
 * @param formData The form data to send
 * @returns Promise with the fetch response
 */
export const sendContactFormToGoogleSheets = async (formData: ContactFormData): Promise<Response> => {
  // Google Apps Script web app URL
  // Replace this with your actual deployed Google Apps Script web app URL
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
