const typal = require('../util/typal').typal;
const Set = require('../util/set').Set;

const Nonterminal = typal.construct({
    constructor: function Nonterminal(symbol) {
        this.symbol = symbol;
        this.productions = new Set();
        this.first = [];
        this.follows = [];
        this.nullable = false;
    },
    toString: function Nonterminal_toString() {
        var str = this.symbol + "\n";
        str += (this.nullable ? 'nullable' : 'not nullable');
        str += "\nFirsts: " + this.first.join(', ');
        str += "\nFollows: " + this.follows.join(', ');
        str += "\nProductions:\n  " + this.productions.join('\n  ');
        return str;
    }
});

module.exports = Nonterminal;
