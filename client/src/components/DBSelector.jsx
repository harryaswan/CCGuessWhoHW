var React = require('react');

var DBSelector = React.createClass({

    render: function() {
        return (
            <select className="db-selector" onChange={this.selectDB}>
                <option value="pulpfiction">Pulp Fiction</option>
                <option value="sample">Sample</option>
            </select>
        );
    },
    selectDB: function(e) {
        console.log('name', e.target.value);
        this.props.selectDB(e.target.value);
    }

});

module.exports = DBSelector;
