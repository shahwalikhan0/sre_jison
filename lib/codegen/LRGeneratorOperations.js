function closureOperation(itemSet /*, closureSet*/) {
    var closureSet = new this.ItemSet();
    var self = this;

    var set = itemSet,
        itemQueue = [];  // Change from Set() to Array
    var syms = {};

    do {
        closureSet.concat(set);
        set.forEach(function CO_set_forEach(item) {
            var symbol = item.markedSymbol;

            // if token is a non-terminal, recursively add closures
            if (symbol && self.nonterminals[symbol]) {
                if (!syms[symbol]) {
                    self.nonterminals[symbol].productions.forEach(function CO_nt_forEach(production) {
                        var newItem = new self.Item(production, 0);
                        if (!closureSet.contains(newItem))
                            itemQueue.push(newItem);  // Using push on array
                    });
                    syms[symbol] = true;
                }
            } else if (!symbol) {
                // reduction
                closureSet.reductions.push(item);
                closureSet.inadequate = closureSet.reductions.length > 1 || closureSet.shifts;
            } else {
                // shift
                closureSet.shifts = true;
                closureSet.inadequate = closureSet.reductions.length > 0;
            }
        });

        set = itemQueue;

    } while (itemQueue.length > 0);  // Check if itemQueue is not empty

    return closureSet;
}

module.exports = closureOperation;
