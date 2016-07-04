var React = require('react');

var GuessMaker = React.createClass({
    getInitialState: function() {
        return {
            selectedName: null
        };
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({selectedName: nextProps.data[0].name});
    },
    render: function() {
        var guessSelect = null;
        if (this.props.data) {
            var options = this.props.data.map(function(person) {
                return (<option key={person.name} value={person.name}>{person.name}</option>)
            });
            guessSelect = (<select onChange={this.selectName}>{options}</select>);
        }

        return (
            <div className="guess">
                {guessSelect}
                <input type="button" value="Guess!" onClick={this.makeGuess} />
            </div>
        );
    },
    selectName: function(e) {
        this.setState({selectedName: e.target.value});
        // this.props.resetAnswer();
    },
    makeGuess: function() {
        this.props.makeGuess(this.state.selectedName);
    }

});

module.exports = GuessMaker;
