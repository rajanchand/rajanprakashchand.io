
# Google Sheets Integration Guide

To connect your contact form to Google Sheets, follow these steps:

## 1. Set up a Google Sheet

1. Create a new Google Sheet at: https://docs.google.com/spreadsheets/d/1XqsKSBhWROJx_IXaln3TnCGFHB3_ylPJ5BBVc4fyx0o/edit?gid=0
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
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses") || 
                  SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Get form data from the request
    const formData = e.parameter;
    
    // If no data was sent in parameter, try the post data
    if (!formData || Object.keys(formData).length === 0) {
      try {
        const postData = e.postData.contents;
        if (postData) {
          formData = JSON.parse(postData);
        }
      } catch (error) {
        // Handle parsing error
        Logger.log("Error parsing post data: " + error);
      }
    }
    
    // Make sure we have headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "name", "email", "address", "subject", "message", 
        "ipAddress", "deviceInfo", "osInfo", "browserInfo", 
        "location", "weather", "timestamp"
      ]);
    }
    
    // Append data to sheet
    sheet.appendRow([
      formData.name || "",
      formData.email || "",
      formData.address || "",
      formData.subject || "",
      formData.message || "",
      formData.ipAddress || "",
      formData.deviceInfo || "",
      formData.osInfo || "",
      formData.browserInfo || "",
      formData.location || "",
      formData.weather || "",
      formData.timestamp || new Date().toISOString()
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ 
      result: 'success',
      data: formData
    }))
    .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log("Error in doPost: " + error);
    return ContentService.createTextOutput(JSON.stringify({ 
      result: 'error', 
      error: error.toString() 
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ 
    result: 'success',
    message: 'The web app is running correctly. Use POST to submit data.'
  }))
  .setMimeType(ContentService.MimeType.JSON);
}
```

3. Save the script and click on "Deploy" > "New deployment"
4. Select "Web app" as the deployment type
5. Set "Who has access" to "Anyone"
6. Click "Deploy" and authorize the app
7. Copy the provided Web app URL - this is your webhook URL to use in the contact form
8. Update the `scriptURL` in the `googleSheetsService.ts` file with this URL

## Important Notes

- Ensure your Google Sheets is publicly accessible or shared with the appropriate users
- The Google Apps Script deployment must be set to "Anyone" can access for the form to work properly
- If you make changes to the script, you need to create a new deployment for the changes to take effect
- Check the browser console for any error messages if the form submission doesn't work
- You can test the deployment by visiting the web app URL directly in your browser
- The form automatically collects the following information:
  - IP Address
  - Device information (mobile/desktop/tablet)
  - Operating system information
  - Browser information
  - Geographic location (if permission granted)
  - Current weather (based on location)
  - Timestamp
