import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import axios from 'axios'

var GCM_ENDPOINT = 'https://android.googleapis.com/gcm/send';
var API_KEY = 'AAAAzriVFW0:APA91bE2RU0mFhiVnods85R9H6Z-5yL8BG4lJz1O2OqVoyYbUKD9M0PtOndd2gr6dbSyfGSBENYHgtkAq93w2JN3qmJGuIPzRtYZ1a1jqG_r6YL25krunsI1mh4URby_UkBRApQCQUKYM52xDyEeIuSsgio2VMdzVw';

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);

/* Service Worker Suff */
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('./sw.js', {scope: '/'}).then(function(reg) {
    console.log('Registeration worked!')
    subscribe();
  }).catch(function() {
    console.log('Registeration failed!')
  })
}

function subscribe() {
  navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
    serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
      .then(function(subscription) {

        return sendSubscriptionToServer(subscription);
      })
      .catch(function(e) {
        if (Notification.permission === 'denied') {
          // The user denied the notification permission which
          // means we failed to subscribe and the user will need
          // to manually change the notification permission to
          // subscribe to push messages
          window.Demo.debug.log('Permission for Notifications was denied');

        } else {
          // A problem occurred with the subscription, this can
          // often be down to an issue or lack of the gcm_sender_id
          // and / or gcm_user_visible_only
          window.Demo.debug.log('Unable to subscribe to push.', e);
        }
      });
  });
}


function sendSubscriptionToServer(subscription) {

  console.log('TODO: Implement sendSubscriptionToServer()');

  var mergedEndpoint = endpointWorkaround(subscription);

  // This is just for demo purposes / an easy to test by
  // generating the appropriate cURL command
  showCurlCommand(mergedEndpoint);
}


function endpointWorkaround(pushSubscription) {
  // Make sure we only mess with GCM
  if (pushSubscription.endpoint.indexOf('https://android.googleapis.com/gcm/send') !== 0) {
    return pushSubscription.endpoint;
  }

  var mergedEndpoint = pushSubscription.endpoint;
  // Chrome 42 + 43 will not have the subscriptionId attached
  // to the endpoint.
  if (pushSubscription.subscriptionId &&
    pushSubscription.endpoint.indexOf(pushSubscription.subscriptionId) === -1) {
    // Handle version 42 where you have separate subId and Endpoint
    mergedEndpoint = pushSubscription.endpoint + '/' +
      pushSubscription.subscriptionId;
  }
  return mergedEndpoint;
}


function showCurlCommand(mergedEndpoint) {
  // The curl command to trigger a push message straight from GCM
  if (mergedEndpoint.indexOf(GCM_ENDPOINT) !== 0) {
    window.Demo.debug.log('This browser isn\'t currently ' +
      'supported for this demo');
    return;
  }

  var endpointSections = mergedEndpoint.split('/');
  var subscriptionId = endpointSections[endpointSections.length - 1];

  var curlCommand = 'curl --header "Authorization: key=' + API_KEY +
    '" --header Content-Type:"application/json" ' + GCM_ENDPOINT +
    ' -d "{\\"registration_ids\\":[\\"' + subscriptionId + '\\"]}"';

  console.log(curlCommand)
}
