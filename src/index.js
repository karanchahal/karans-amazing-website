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
  navigator.serviceWorker.register('./sw.js', {scope: '/'}).then(function(reg) {
    console.log('Registeration worked!')

    reg.pushManager.subscribe({
        userVisibleOnly: true
    }).then(function (sub) {
        console.log('Subscribed !')
        console.log(sub.endpoint)
        axios.post('http://localhost:3030/endpoint',{
          'endpoint': sub.endpoint
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err));

    });


  }).catch(function() {
    console.log('Registeration failed!')
  })
}
/*
if(!navigator.onLine) {
  document.body.style.backgroundColor = "lightblue";
}


self.addEventListener('online',function() {
  document.body.style.backgroundColor = "white";
})


self.addEventListener('offline',function() {
  document.body.style.backgroundColor = "lightblue";
})
*/
