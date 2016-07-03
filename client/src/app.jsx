var React = require('react');
var ReactDOM = require('react-dom');
var GuessWho = require('./components/GuessWho.jsx');

window.onload = function(){
  ReactDOM.render(
    <GuessWho url="api/comments" />,
    document.getElementById('app')
  );
}
