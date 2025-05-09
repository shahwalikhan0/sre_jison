const ebnfParser = require('ebnf-parser');
var Nonterminal = require('./Nonterminal');
var Production = require('./Production');

function processOperators (ops) {
    if (!ops) return {};
    var operators = {};
    for (var i=0,k,prec;prec=ops[i]; i++) {
        for (k=1;k < prec.length;k++) {
            operators[prec[k]] = {precedence: i+1, assoc: prec[0]};
        }
    }
    return operators;
}

function processGrammar(grammar) {
    const bnf = grammar.bnf || ebnfParser.transform(grammar.ebnf);
    let tokens = grammar.tokens;
    const nonterminals = {};
    const productions = [];
    const symbols = [];

    if (tokens) {
        tokens = (typeof tokens === 'string') ? tokens.trim().split(/\s+/) : tokens.slice(0);
    }

    const operators = processOperators(grammar.operators);
    this.buildProductions(bnf, productions, nonterminals, symbols, operators);

    if (tokens && this.terminals.length !== tokens.length) {
        this.trace("Warning: declared tokens differ from tokens found in rules.");
        this.trace(this.terminals);
        this.trace(tokens);
    }

    this.nonterminals = nonterminals;
    this.productions = productions;
    this.symbols = symbols;
    this.augmentGrammar(grammar);

}

function augmentGrammar (grammar) {
    if (this.productions.length === 0) {
        throw new Error("Grammar error: must have at least one rule.");
    }
    // use specified start symbol, or default to first user defined production
    this.startSymbol = grammar.start || grammar.startSymbol || this.productions[0].symbol;
    if (!this.nonterminals[this.startSymbol]) {
        throw new Error("Grammar error: startSymbol must be a non-terminal found in your grammar.");
    }
    this.EOF = "$end";

    // augment the grammar
    var acceptProduction = new Production('$accept', [this.startSymbol, '$end'], 0);
    this.productions.unshift(acceptProduction);

    // prepend parser tokens
    this.symbols.unshift("$accept",this.EOF);
    this.symbols_.$accept = 0;
    this.symbols_[this.EOF] = 1;
    this.terminals.unshift(this.EOF);

    this.nonterminals.$accept = new Nonterminal("$accept");
    this.nonterminals.$accept.productions.push(acceptProduction);

    this.nonterminals[this.startSymbol].follows.push(this.EOF);
};

module.exports = {
    processGrammar,
    augmentGrammar,
};
