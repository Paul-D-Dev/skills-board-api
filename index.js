import express from "express";
import {google} from "googleapis";
import {mappingDataSheet} from "./shared/functions/mappingDataSheet.js";
import {config} from "dotenv";
import cors from "cors";

const app = express();
const port = 3000;
config();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
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

    res.send(metaData.data);
})

app.get('/stackers', async (req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    })

    // Create client instance for auth
    const client = await auth.getClient();

    // Instance of Google Sheet API
    const sheets = google.sheets({version: 'v4', auth: client});
    const spreadsheetId = process.env.SHEET_ID;

    // Read rows from spreadsheet
    const rowsData = await sheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: 'Stackers!A:G'
    })
    const stackers = mappingDataSheet(rowsData.data.values);
    res.send(stackers);
})

app.listen(port, () => console.log('Express 3000'));
