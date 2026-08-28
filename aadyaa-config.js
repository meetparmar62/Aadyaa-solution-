// Paste your deployed Google Apps Script Web App URL between the quotes.
const AADYAA_SHEETS_ENDPOINT = '';

async function saveAadyaaLead(lead) {
	if (!AADYAA_SHEETS_ENDPOINT) throw new Error('Google Sheets endpoint is not configured.');
	const response = await fetch(AADYAA_SHEETS_ENDPOINT, { method: 'POST', body: JSON.stringify(lead) });
	if (!response.ok) throw new Error('Lead could not be saved.');
}

async function loadAadyaaLeads() {
	if (!AADYAA_SHEETS_ENDPOINT) return [];
	const response = await fetch(AADYAA_SHEETS_ENDPOINT);
	if (!response.ok) throw new Error('Leads could not be loaded.');
	return response.json();
}
