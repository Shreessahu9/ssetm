// Google Sheets API credentials
const CLIENT_ID = '214282651980-do03ljbem9q7l1u5g17rrftmkqcmfv33.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBXPKeqKvS6xcMdL-qcy4DNHe5mby-kYvc';

// Function to authenticate user using Google Sheets API
function authenticateUser(username, password, callback) {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
    }).then(function () {
        return gapi.auth2.getAuthInstance().signIn();
    }).then(function () {
        gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '1c2CZbKEbMCwfOoeGtQoXEBzfT0qnWINCF9Nk9yXe3Fc',
            range: 'Sheet1!A2:B',
        }).then(function(response) {
            const rows = response.result.values;
            let authenticated = false;
            
            if (rows.length > 0) {
                for (const row of rows) {
                    if (row[0] === username && row[1] === password) {
                        authenticated = true;
                        break;
                    }
                }
            }

            callback(authenticated);
        }, function(response) {
            console.log('Error: ' + response.result.error.message);
            callback(false);
        });
    });
}

// Function to handle login form submission
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    authenticateUser(username, password, function(authenticated) {
        if (authenticated) {
            // Redirect to dashboard.html after successful login
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid username or password.');
        }
    });
}

// Load Google API client library and initialize
function initClient() {
    gapi.load('client:auth2', initClient);
}

// Initialize client on load
initClient();
