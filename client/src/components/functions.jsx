var Power = {
    caps: function(word) {
        var fLetter = word[0].toUpperCase();
        return `${fLetter}${word.substring(1)}`;
    },
    uniq: function(array) {
        var newArray = [];
        for (var el of array) {
            if (newArray.indexOf(el) === -1) {
                newArray.push(el);
            }
        }
        return newArray;
    },
    removeUnderscore: function(input) {
        if (typeof input === "string") {
            return input.replace("_", " ");
        } else {
            return input;
        }
    },
    addUnderscore: function(input) {
        if (typeof input === "string") {
            return input.replace(" ", "_");
        } else {
            return input;
        }
    },
    removeProp: function(object, propertyToRemove) {
        var newObject = {};
        for (var key of Object.keys(object)) {
            if (key !== propertyToRemove) {
                newObject[key] = object[key];
            }
        }
        return newObject;
    },
    sort: function(array) {
        if (typeof array[0] === "string") {
            return array.sort();
        } else if (typeof array[0] === "number"){
            return array.sort(function(a, b) {
                return a - b;
            });
        }
        return array;
    }
};

module.exports = Power;
