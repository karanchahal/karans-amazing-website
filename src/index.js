import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';


ReactDOM.render(
  <Root />,
  document.getElementById('root')
);

/* Service Worker Suff */
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('./sw.js', {scope: '/'}).then(function() {
    console.log('Registeration worked!')
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
