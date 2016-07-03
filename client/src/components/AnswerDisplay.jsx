var React = require('react');

var AnswerDisplay = React.createClass({

    render: function() {
        var answer = null;
        if (this.props.win !== null) {
            var winText = this.props.win ? "Yay! You got it right!" : "Nope, try again...";
            answer = (<span><p>{winText}</p><button onClick={this.props.gameReset}>Reset</button></span>)
        } else if (this.props.answer !== null) {
            answer = <p>{this.props.answer ? "Yes!" : "Nope!"}</p>;
        }

        return (
            <div className="answer">
                {answer}
            </div>
        );
    }

});

module.exports = AnswerDisplay;
