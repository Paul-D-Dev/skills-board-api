const express = require('express');
const { google } = require('googleapis');
const app = express();
const port = 3000;
require('dotenv').config();

app.get('/', async (req, res) => {

    const auth = new google.auth.GoogleAuth({
        keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })

    // Create client instance for auth
    const client = await auth.getClient();

    // Instance of Google Sheet API
    const sheets = google.sheets({version: 'v4', auth: client});
    const spreadsheetId = process.env.SHEET_ID;

    // Get metadata about spreadsheet
    const metaData = await sheets.spreadsheets.get({
        auth,
        spreadsheetId
    })

    // Read rows from spreadsheet
    const rowsData = await sheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: 'Stakers!A:C'
    })
    res.send(rowsData.data);
})

app.listen(port, () => console.log('Express 3000'));
