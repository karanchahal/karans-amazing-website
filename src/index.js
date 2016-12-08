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

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
