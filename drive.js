//googleapis
const { google } = require('googleapis');
//path module
const path = require('path');
//file system module
const fs = require('fs');
const tokens = require('./tokens.js');


const CLIENT_ID = tokens.clientID;
//client secret
const CLIENT_SECRET = tokens.clientSecret;
const REDIRECT_URI = tokens.redirectURI;
//refresh token
const REFRESH_TOKEN = tokens.token;

//intialize auth client
const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
//setting our auth credentials
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

//initialize google drive
const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

//file path for out file
//const filePath = `H:/Downloads/progit.pdf`;

//function to upload the file
async function uploadFile(file) {
    try{
        console.log('trying to upload file');
        let fileName = file;
        let filePath = `uploads/${file}`;
        const response = await drive.files.create({
            requestBody: {
                name:  `${fileName}`, //file name
                mimeType: 'audio/wav',
            },
            media: {
                mimeType: 'audio/wav',
                body: fs.createReadStream(filePath)
            },
        });
        // report the response from the request
        console.log(response.data);
    }catch (error) {
        //report the error message
        console.log(error.message);
    }
}

module.exports.uploadFile = uploadFile;