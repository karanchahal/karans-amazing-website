import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import axios from 'axios'

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);

/* Service Worker Suff */
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('./sw.js', {scope: '/'})
  .then(reg => {
      return reg.pushManager.subscribe({userVisibleOnly: true})
  })
  .then(function (sub) {
      console.log('Subscribed !')
      var endpointSections = sub.endpoint.split('/');
      var subscriptionId = endpointSections[endpointSections.length - 1];

      return axios.post('http://localhost:3030/endpoint',{
        'endpoint': subscriptionId
      })

    })
  .then(res => {
      console.log(res)
  })
  .catch(err => {
      console.log('Registeration failed!',err)
  })
}
