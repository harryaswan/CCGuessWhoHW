var React = require('react');
var Power = require('./functions.jsx');

var QuestionMaker = React.createClass({
    getInitialState: function() {
        var data = this.props.data;
        return {
            selectedProperty: null,
            selectedValue: null
        };
    },
    generateChars: function(data) {
        var characteristics = {};
        if (data) {
            for (var person of data) {
                for (var key of Object.keys(person)) {
                    if (characteristics[key]) {
                        characteristics[key].push(person[key]);
                    } else {
                        characteristics[key] = [person[key]];
                    }
                }
            }
        }
        for (var cs of Object.keys(characteristics)) {
            characteristics[cs] = Power.sort(Power.uniq(characteristics[cs]));
        }
        characteristics = Power.removeProp(characteristics, "name");
        characteristics = Power.removeProp(characteristics, "visible");
        return characteristics;
    },
    generateSelects: function(chars) {
        var propSelector = null;
        var valSelector = null;
        var goButton = null;
        if (Object.keys(chars).length > 0) {
            var propOptions =  Object.keys(chars).map(function(c) {
                return <option key={c} value={c}>{Power.removeUnderscore(Power.caps(c))}</option>;
            });
            propSelector = (<select key="select_properties" onChange={this.handlePropSelect}>{propOptions}</select>);

            var tmp = chars[this.state.selectedProperty].map(function(val) {
                return (<option key={val} value={val}>{Power.caps(val.toString())}</option>);
            });

            valSelector = (<select key="select_values" onChange={this.handleValSelect} value={this.state.selectedValue}>{tmp}</select>);
            goButton = (<input key="select_gobutton" type="button" onClick={this.handleAskQuestion} value="Ask" />);
        }
        return [propSelector, valSelector, goButton];
    },
    componentDidMount: function() {

    },
    componentWillReceiveProps: function(nextProps) {
        this.fillSelected(this.generateChars(nextProps.data));
    },
    render: function() {
        var chars = this.generateChars(this.props.data);
        var selects = this.generateSelects(chars);
        return (
            <div className="questions">
                {selects}
            </div>
        );
    },
    fillSelected: function(data) {
        if (Object.keys(data).length > 0 && this.state.selectedProperty === null) {
            this.setState({
                selectedProperty: Object.keys(data)[0],
                selectedValue: data[Object.keys(data)[0]][0]
            });
        }

    },
    handlePropSelect: function(e) {
        e.preventDefault();
        var chars = this.generateChars(this.props.data);
        console.log('chars', chars);
        this.setState({selectedProperty: e.target.value, selectedValue: chars[e.target.value][0]});
    },

    handleValSelect: function(e) {
        e.preventDefault();
        var val = e.target.value;

        if (val === "true") {
            val = true;
        } else if (val === "false") {
            val = false;
        }
        this.setState({selectedValue: val});
    },
    handleAskQuestion: function() {
        this.props.askQuestion({property: this.state.selectedProperty, value:this.state.selectedValue});
    }

});

module.exports = QuestionMaker;
