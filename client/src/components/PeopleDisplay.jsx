const React = require('react');
const Person = require('./Person.jsx');

var PeopleDisplay = React.createClass({

    render: function() {
        var people = <h1>Loading...</h1>;

        if (this.props.data) {
            people = [];
            for (var person of this.props.data) {
                people.push(<Person key={person.name} data={person} alterData={this.props.alterData} db={this.props.db}/>);
            }
        }

        return (
            <div className="cards">
                {people}
            </div>
        );
    }

});

module.exports = PeopleDisplay;
