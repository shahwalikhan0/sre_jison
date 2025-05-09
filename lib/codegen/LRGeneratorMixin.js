// buildTable.js

// find states with only one action, a reduction
function findDefaults (states) {
    var defaults = {};
    states.forEach(function (state, k) {
        var i = 0;
        for (var act in state) {
             if ({}.hasOwnProperty.call(state, act)) i++;
        }

        if (i === 1 && state[act][0] === 2) {
            // only one action in state and it's a reduction
            defaults[k] = state[act];
        }
    });

    return defaults;
}

var lalrGeneratorDebug = {
    trace: function trace () {
    },
    beforebuildNewGrammar: function () {
        this.trace(this.states.size()+" states.");
        this.trace("Building lookahead grammar.");
    },
    beforeunionLookaheads: function () {
        this.trace("Computing lookaheads.");
    }
};

var lrGeneratorDebug = {
    beforeparseTable: function () {
        this.trace("Building parse table.");
    },
    afterparseTable: function () {
        var self = this;
        if (this.conflicts > 0) {
            this.resolutions.forEach(function (r, i) {
                if (r[2].bydefault) {
                    self.warn('Conflict at state: ',r[0], ', token: ',r[1], "\n  ", printAction(r[2].r, self), "\n  ", printAction(r[2].s, self));
                }
            });
            this.trace("\n"+this.conflicts+" Conflict(s) found in grammar.");
        }
        this.trace("Done.");
    },
    aftercanonicalCollection: function (states) {
        var trace = this.trace;
        trace("\nItem sets\n------");

        states.forEach(function (state, i) {
            trace("\nitem set",i,"\n"+state.join("\n"), '\ntransitions -> ', JSON.stringify(state.edges));
        });
    }
};

function buildTable() {
    if (this.DEBUG) this.mix(lrGeneratorDebug); // mixin debug methods

    this.states = this.canonicalCollection();
    this.table = this.parseTable(this.states);
    this.defaultActions = findDefaults(this.table);
}

function defineItem(typal, lrGeneratorMixin) {
    lrGeneratorMixin.Item = typal.construct({
        constructor: function Item(production, dot, f, predecessor) {
            this.production = production;
            this.dotPosition = dot || 0;
            this.follows = f || [];
            this.predecessor = predecessor;
            this.id = parseInt(production.id + 'a' + this.dotPosition, 36);
            this.markedSymbol = this.production.handle[this.dotPosition];
        },
        remainingHandle: function () {
            return this.production.handle.slice(this.dotPosition + 1);
        },
        eq: function (e) {
            return e.id === this.id;
        },
        handleToString: function () {
            var handle = this.production.handle.slice(0);
            handle[this.dotPosition] = '.' + (handle[this.dotPosition] || '');
            return handle.join(' ');
        },
        toString: function () {
            var temp = this.production.handle.slice(0);
            temp[this.dotPosition] = '.' + (temp[this.dotPosition] || '');
            return (
                this.production.symbol + ' -> ' + temp.join(' ') +
                (this.follows.length === 0 ? '' : ' #lookaheads= ' + this.follows.join(' '))
            );
        }
    });
};

module.exports = { 
    buildTable,
    findDefaults,
    lrGeneratorDebug,
    lalrGeneratorDebug,
    defineItem
};
