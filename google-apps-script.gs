const SHEET_NAME = 'Leads';

function doPost(e) {
  const data = JSON.parse(e.postData.contents || '{}');
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME) || SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(['Name', 'Phone', 'Package', 'Optional Add-ons', 'Source', 'Received At']);
  sheet.appendRow([data.name || '', data.phone || '', data.package || '', data.addons || 'None selected', data.source || 'website', new Date()]);
  return json({ success: true });
}

function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet || sheet.getLastRow() < 2) return json([]);
  const rows = sheet.getDataRange().getValues();
  const headers = rows.shift();
  return json(rows.map(row => Object.fromEntries(headers.map((header, index) => [header, row[index] instanceof Date ? row[index].toISOString() : row[index]]))));
}

function json(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
