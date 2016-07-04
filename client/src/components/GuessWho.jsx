const React = require('react');
const PeopleDisplay = require('./PeopleDisplay.jsx')
const QuestionMaker = require('./QuestionMaker.jsx')
const GuessMaker = require('./GuessMaker.jsx')
const AnswerDisplay = require('./AnswerDisplay.jsx')
const DBSelector = require('./DBSelector.jsx')

var GuessWho = React.createClass({
    getInitialState: function() {
        return {
            data: null,
            selectedPerson: null,
            answer: null,
            win: null,
            db: "pulpfiction"
        };
    },
    componentDidMount: function() {
        this.grabData();
    },
    render: function() {
        return (
            <div>
                <DBSelector selectDB={this.selectDB} />
                <PeopleDisplay data={this.state.data} alterData={this.alterData} db={this.state.db}/>
                <AnswerDisplay answer={this.state.answer} win={this.state.win} gameReset={this.gameReset} />
                <QuestionMaker data={this.state.data} askQuestion={this.askQuestion} resetAnswer={this.resetAnswer}/>
                <GuessMaker data={this.getVisiblePeople()} makeGuess={this.makeGuess} resetAnswer={this.resetAnswer}/>
            </div>
        );
    },
    callAJAX: function(type, url, data=null) {
        return new Promise(function(resolve, reject) {
            var request = new XMLHttpRequest();
            request.onload = function() {
                if (request.status === 200) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject(request.status);
                }
            }
            request.open(type, url);
            if (type !== "get" && type !== "GET") {
                request.setRequestHeader('Content-Type', 'application/json');
            }
            request.send(data);
        });
    },
    grabData: function() {
        this.callAJAX("get", `/api/people?db=${this.state.db}`)
        .then(function(data) {
            this.gameSetup(data);
        }.bind(this))
        // .catch(function(error) {
        //     console.error(error);
        // });
    },
    alterData: function(persons, property, setVal, actualSet) {
        if (persons.length > 0) {
            persons = persons.map(function(per) {
                per[property] = setVal;
                return per;
            });
        } else {
            persons[property] = setVal;
        }
        if (actualSet) {
            this.setData(persons);
        }
        return persons;
    },
    setData: function(persons) {
        var newData = null;
        if (persons.length > 0) {
            newData = persons;
        } else {
            newData = this.state.data.map(function(person) {
                if (person.name === persons.name) {
                    return persons;
                } else {
                    return person;
                }
            });
        }
        this.setState({data: newData});
    },
    askQuestion: function(question) {
        var person = this.getSelectedPerson();
        var answer = person[question.property] == question.value;
        var newData = this.state.data.map(function(per) {
            if (answer) {
                if (per[question.property] != question.value) {
                    per.visible = false;
                }
            } else {
                if (per[question.property] == question.value) {
                    per.visible = false;
                }
            }
            return per;
        });
        this.setState({data: newData, answer: answer, win:null});
    },
    resetAnswer: function() {
        this.setState({answer: null, win: null});
    },
    getSelectedPerson: function() {
        return this.state.data[this.state.selectedPerson];
    },
    selectRandomPerson: function(persons) {
        if (persons.length > 0) {
            return parseInt(Math.random() * persons.length);
        }
        return null;
    },
    getVisiblePeople: function() {
        if (this.state.data) {
            return this.state.data.filter(function(person) {
                return person.visible === true;
            });
        }
        return null;
    },
    makeGuess: function(name) {
        this.setState({win: this.getSelectedPerson().name === name, answer:null});
    },
    gameReset: function() {
        this.gameSetup(this.state.data);
    },
    gameSetup: function(data) {
        var randomIndex = this.selectRandomPerson(this.alterData(data, "visible", true, true));
        this.setState({selectedPerson: randomIndex, answer: null, win: null});
    },
    selectDB: function(dbName) {
        this.setState({db: dbName}, this.grabData);
    }
});

module.exports = GuessWho;
