var Set        = require('../util/set').Set;

const lookaheadMixin = {};

lookaheadMixin.computeLookaheads = function computeLookaheads () {
    if (this.DEBUG) this.mix(lookaheadDebug); // mixin debug methods

    this.computeLookaheads = function () {};
    this.nullableSets();
    this.firstSets();
    this.followSets();
};

lookaheadMixin.followSets = function followSets () {
    const productions = this.productions;
    const nonterminals = this.nonterminals;
    const self = this;
    let cont = true;

    while (cont) {
        cont = false;

        productions.forEach(function (production) {
            let q;
            const ctx = !!self.go_;
            let set = [], oldcount;

            for (let i = 0, t; t = production.handle[i]; ++i) {
                if (!nonterminals[t]) continue;
                if (ctx)
                    q = self.go_(production.symbol, production.handle.slice(0, i));
                const bool = !ctx || q === parseInt(self.nterms_[t], 10);

                if (i === production.handle.length + 1 && bool) {
                    set = nonterminals[production.symbol].follows;
                } else {
                    const part = production.handle.slice(i + 1);
                    set = self.first(part);
                    if (self.nullable(part) && bool) {
                        set.push(...nonterminals[production.symbol].follows);
                    }
                }

                oldcount = nonterminals[t].follows.length;
                Set.union(nonterminals[t].follows, set);
                if (oldcount !== nonterminals[t].follows.length) {
                    cont = true;
                }
            }
        });
    }
};

lookaheadMixin.first = function first (symbol) {
    if (symbol === '') {
        return [];
    } else if (Array.isArray(symbol)) {
        const firsts = [];
        for (let i = 0, t; t = symbol[i]; ++i) {
            if (!this.nonterminals[t]) {
                if (!firsts.includes(t)) firsts.push(t);
            } else {
                Set.union(firsts, this.nonterminals[t].first);
            }
            if (!this.nullable(t)) break;
        }
        return firsts;
    } else if (!this.nonterminals[symbol]) {
        return [symbol];
    } else {
        return this.nonterminals[symbol].first;
    }
};

lookaheadMixin.firstSets = function firstSets () {
    const productions = this.productions;
    const nonterminals = this.nonterminals;
    const self = this;
    let cont = true;

    while (cont) {
        cont = false;

        productions.forEach(function (production) {
            const firsts = self.first(production.handle);
            if (firsts.length !== production.first.length) {
                production.first = firsts;
                cont = true;
            }
        });

        for (const symbol in nonterminals) {
            const firsts = [];
            nonterminals[symbol].productions.forEach(function (production) {
                Set.union(firsts, production.first);
            });
            if (firsts.length !== nonterminals[symbol].first.length) {
                nonterminals[symbol].first = firsts;
                cont = true;
            }
        }
    }
};

lookaheadMixin.nullableSets = function nullableSets () {
    const nonterminals = this.nonterminals;
    const self = this;
    let cont = true;

    while (cont) {
        cont = false;

        this.productions.forEach(function (production) {
            if (!production.nullable) {
                let n = 0;
                for (let i = 0, t; t = production.handle[i]; ++i) {
                    if (self.nullable(t)) n++;
                }
                if (n === production.handle.length) {
                    production.nullable = cont = true;
                }
            }
        });

        for (const symbol in nonterminals) {
            if (!self.nullable(symbol)) {
                for (let i = 0, production; production = nonterminals[symbol].productions.item(i); i++) {
                    if (production.nullable) {
                        nonterminals[symbol].nullable = cont = true;
                        break;
                    }
                }
            }
        }
    }
};

lookaheadMixin.nullable = function nullable (symbol) {
    if (symbol === '') {
        return true;
    } else if (Array.isArray(symbol)) {
        return symbol.every(t => this.nullable(t));
    } else if (!this.nonterminals[symbol]) {
        return false;
    } else {
        return this.nonterminals[symbol].nullable;
    }
};

const lookaheadDebug = {
    beforenullableSets: function () {
        this.trace("Computing Nullable sets.");
    },
    beforefirstSets: function () {
        this.trace("Computing First sets.");
    },
    beforefollowSets: function () {
        this.trace("Computing Follow sets.");
    },
    afterfollowSets: function () {
        const trace = this.trace;
        each(this.nonterminals, function (nt, t) {
            trace(nt, '\n');
        });
    }
};

module.exports = lookaheadMixin;
