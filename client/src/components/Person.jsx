const React = require('react');
const Power = require('./functions.jsx');

var Person = React.createClass({

    render: function() {
        var visible = this.props.data.visible ? "visible" : "not-visible";

        var alterData = function(e) {
            console.log('clicky');
            this.props.alterData(this.props.data, "visible", !this.props.data.visible, true);
        }.bind(this);

        var flipped = null;
        if (!this.props.data.visible) {
            flipped = " flipped";
        }

        return (
            <div className={`card ${flipped}`} onClick={alterData}>
              <div className="card__front">
                <span className="card__text"><img src={`imgs/pulpfiction/${Power.addUnderscore(this.props.data.name.toLowerCase())}.png`} /></span>
              </div>
              <div className="card__back">
                <span className="card__text"><img src={`imgs/card_back.jpg`} /></span>
              </div>
            </div>
        );

        // return (
            // <div className={`person ${visible}`} onClick={alterData}>
            //     <img src={`imgs/pulpfiction/${Power.addUnderscore(this.props.data.name.toLowerCase())}.png`} height="50px" width="25px" />
            //     <p>{this.props.data.name}</p>
            //     <p>{this.props.data.age}</p>
            // </div>
        // );
    }

});

module.exports = Person;
