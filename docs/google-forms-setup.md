# Google Apps Script - Nexus Waitlist Data Collection

This script receives form submissions from the Nexus landing page and stores them in a Google Sheet.

## Setup Instructions

### Step 1: Create a Google Sheet

1. Go to https://sheets.google.com
2. Create a new spreadsheet named "Nexus Waitlist"
3. In Row 1, add headers: `timestamp | email | source`

### Step 2: Create Google Apps Script

1. In the spreadsheet, go to **Extensions → Apps Script**
2. Delete all existing code and paste the script below
3. Click **Deploy → New deployment**
4. Select type: **Web app**
5. Set "Execute as": **Me**
6. Set "Who has access": **Anyone**
7. Click **Deploy** and copy the Web App URL
8. Replace `YOUR_SCRIPT_ID` in `src/App.tsx` with the URL

### Step 3: Script Code

```javascript
// Google Apps Script - Nexus Waitlist Form Handler
// Paste this into Extensions → Apps Script in your Google Sheet

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(),
      data.email,
      data.source || 'nexus-landing'
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'Nexus Waitlist API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### Step 4: Test

1. Visit the Web App URL in your browser — you should see `{"status":"Nexus Waitlist API is running"}`
2. Submit an email on the landing page
3. Check the Google Sheet — a new row should appear

## Alternative: Use Formspree (No Script Needed)

If you prefer a simpler setup without Google Apps Script:

1. Go to https://formspree.io and create a free account
2. Create a new form
3. Copy the form endpoint (e.g., `https://formspree.io/f/xyzabcde`)
4. Update `src/App.tsx` to use `fetch('https://formspree.io/f/YOUR_ID', { ... })`

## Data Schema

Each submission includes:

| Field | Type | Description |
|-------|------|-------------|
| `timestamp` | ISO 8601 | Submission time |
| `email` | string | User's email address |
| `source` | string | Traffic source (default: "nexus-landing") |
