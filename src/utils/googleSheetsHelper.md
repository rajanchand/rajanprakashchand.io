
# Google Sheets Integration Guide

To connect your contact form to Google Sheets, follow these steps:

## 1. Set up a Google Sheet

1. Create a new Google Sheet
2. Add column headers that match your form fields: 
   - "name"
   - "email" 
   - "address"
   - "subject"
   - "message"
   - "ipAddress"
   - "deviceInfo"
   - "osInfo"
   - "browserInfo"
   - "location"
   - "weather"
   - "timestamp"

## 2. Set up Google Apps Script

1. In your Google Sheet, click on "Extensions" > "Apps Script"
2. Replace the default code with this script:

```javascript
const doPost = (request) => {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Get form data
    const formData = request.parameter;
    
    // Append data to sheet
    sheet.appendRow([
      formData.name,
      formData.email,
      formData.address,
      formData.subject,
      formData.message,
      formData.ipAddress,
      formData.deviceInfo,
      formData.osInfo,
      formData.browserInfo,
      formData.location,
      formData.weather,
      formData.timestamp || new Date().toISOString()
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
};
```

3. Save the script and click on "Deploy" > "New deployment"
4. Select "Web app" as the deployment type
5. Set "Who has access" to "Anyone"
6. Click "Deploy" and authorize the app
7. Copy the provided Web app URL - this is your webhook URL to use in the contact form

## 3. Update your contact form

Replace 'YOUR_GOOGLE_SHEET_WEBHOOK_URL' in the googleSheetsHelper.ts file with the Web app URL you copied from the Google Apps Script deployment.

## Important Notes

- Make sure your column headers in Google Sheets exactly match the field names sent from your form
- The Google Apps Script deployment must be set to "Anyone" can access for the form to work properly
- If you make changes to the script, you need to create a new deployment for the changes to take effect
- The form automatically collects the following information:
  - IP Address
  - Device information (mobile/desktop/tablet)
  - Operating system information
  - Browser information
  - Geographic location (if permission granted)
  - Current weather (based on location)
  - Timestamp

