import { merge } from 'lodash';

// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
let CLIENT_ID = '438342543378-c55mqllkf88f011ruksontiskhgj9oi7.apps.googleusercontent.com';

let SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(email, callback) {
  return (authResult) => {
    let authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
      // Hide auth UI, then load client library.
      authorizeDiv.style.display = 'none';
      gapi.client.load('gmail', 'v1', listMessages(email, callback));
    } else {
      // Show auth UI, allowing the user to initiate authorization by
      // clicking authorize button.
      authorizeDiv.style.display = 'inline';
    }
  };
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
export const handleAuthClick = (email, callback) => {
  return (event) => {
    gapi.auth.authorize(
      {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
      handleAuthResult(email, callback));
    return false;
  };
};

/**
 * Load Gmail API client library. List labels once client library
 * is loaded.
 */
// function loadGmailApi() {
//   gapi.client.load('gmail', 'v1', listMessages);
// }

/**
 * Print all Labels in the authorized user's inbox. If no labels
 * are found an appropriate message is printed.
 */
function listMessages(email, callback) {
  return () => {
    let query = `from:${email}`;

    let request = setQ(gapi.client.gmail.users.messages.list({
      'userId': 'me'
    }), query);

    let allMessages = [];

    request.execute((resp) => {
      let messages = resp.messages;

      let counter = 0;

      messages.forEach(messageInfo => {
        let message = gapi.client.gmail.users.messages.get({
          'userId': 'me',
          'id': messageInfo.id
        });
        message.execute((mess) => {
          let headerData = getHeaderData(mess.payload);
          let body = {body: getBody(mess.payload)};
          let snippet = {snippet: mess.snippet};
          let data = merge({}, headerData, body, snippet);
          allMessages.push(data);
          counter++;
          if (counter === messages.length) {
            callback(allMessages);
          }
        });
      });

    });
  };
}

function setQ(message, query) {
  message.Zq.k5.params = {'q': query};
  return message;
}

function getHeaderData(message) {
  let data = {};
  message.headers.forEach(header => {
    if (header.name === 'From') {
      let str = header.value;
      let email = str.substring(str.lastIndexOf("<")+1,str.lastIndexOf(">"));
      data['from'] = email;
    } else
    if (header.name === 'Subject') {
      data['subject'] = header.value;
    } else
    if (header.name === 'Date') {
      data['date'] = header.value;
    }
  });
  return data;
}

function getBody(message) {
  var encodedBody = '';
  if(typeof message.parts === 'undefined')
  {
    encodedBody = message.body.data;
  }
  else
  {
    encodedBody = getHTMLPart(message.parts);
  }
  encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
  return decodeURIComponent(escape(window.atob(encodedBody)));
}

function getHTMLPart(arr) {
  for(var x = 0; x <= arr.length; x++)
  {
    if(typeof arr[x].parts === 'undefined')
    {
      if(arr[x].mimeType === 'text/html')
      {
        return arr[x].body.data;
      }
    }
    else
    {
      return getHTMLPart(arr[x].parts);
    }
  }
  return '';
}
