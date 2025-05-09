const typal = require('../util/typal').typal;

const Production = typal.construct({
    constructor: function Production(symbol, handle, id) {
        this.symbol = symbol;
        this.handle = handle;
        this.nullable = false;
        this.id = id;
        this.first = [];
        this.precedence = 0;
    },
    toString: function Production_toString() {
        return this.symbol + " -> " + this.handle.join(' ');
    }
});

module.exports = Production;
