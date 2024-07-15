function authenticateUser(username, password, callback) {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: 'YOUR_SPREADSHEET_ID', // Replace with your actual spreadsheet ID
        range: 'Sheet1!A2:B', // Adjust the range if needed
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
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    authenticateUser(username, password, function(authenticated) {
        if (authenticated) {
            alert('Login successful!');
        } else {
            alert('Invalid username or password.');
        }
    });
}

function initClient() {
    gapi.client.init({
        apiKey: 'AIzaSyBXPKeqKvS6xcMdL-qcy4DNHe5mby-kYvc', // Replace with your actual API key
        clientId: '214282651980-do03ljbem9q7l1u5g17rrftmkqcmfv33.apps.googleusercontent.com', // Replace with your actual client ID
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        scope: "https://www.googleapis.com/auth/spreadsheets.readonly",
    }).then(function () {
        document.getElementById('loginForm').addEventListener('submit', handleLogin);
    }, function(error) {
        console.log(JSON.stringify(error, null, 2));
    });
}

gapi.load('client:auth2', initClient);
