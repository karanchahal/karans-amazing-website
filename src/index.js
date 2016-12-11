import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('./sw.js', {scope: '/'}).then(function() {
    console.log('Registeration worked!')
  }).catch(function() {
    console.log('Registeration failed!')
  })
}

self.addEventListener('online',function() {
  console.log('yay');
})


self.addEventListener('offline',function() {
  console.log('nay');
  document.body.style.backgroundColor = "lightblue";
})

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
