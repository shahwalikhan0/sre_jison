var Production = require('../grammar/Production');

function buildProduction (handle, symbolId, symbols, productions, productions_, nonterminals, operators, actionGroups) {

    var symbols_ = {};
    function addSymbol (s) {
        if (s && !symbols_[s]) {
            symbols_[s] = ++symbolId;
            symbols.push(s);
        }
    }
    var r, rhs, i;
    if (handle.constructor === Array) {
        rhs = (typeof handle[0] === 'string') ?
                  handle[0].trim().split(' ') :
                  handle[0].slice(0);

        for (i=0; i<rhs.length; i++) {
            if (rhs[i] === 'error') her = true;
            if (!symbols_[rhs[i]]) {
                addSymbol(rhs[i], symbols_, symbolId, symbols);
            }
        }

        if (typeof handle[1] === 'string' || handle.length == 3) {
            // semantic action specified
            var label = 'case ' + (productions.length+1) + ':', action = handle[1];

            // replace named semantic values ($nonterminal)
            if (action.match(/[$@][a-zA-Z][a-zA-Z0-9_]*/)) {
                var count = {},
                    names = {};
                for (i=0;i<rhs.length;i++) {
                    // check for aliased names, e.g., id[alias]
                    var rhs_i = rhs[i].match(/\[[a-zA-Z][a-zA-Z0-9_-]*\]/);
                    if (rhs_i) {
                        rhs_i = rhs_i[0].substr(1, rhs_i[0].length-2);
                        rhs[i] = rhs[i].substr(0, rhs[i].indexOf('['));
                    } else {
                        rhs_i = rhs[i];
                    }

                    if (names[rhs_i]) {
                        names[rhs_i + (++count[rhs_i])] = i+1;
                    } else {
                        names[rhs_i] = i+1;
                        names[rhs_i + "1"] = i+1;
                        count[rhs_i] = 1;
                    }
                }
                action = action.replace(/\$([a-zA-Z][a-zA-Z0-9_]*)/g, function (str, pl) {
                        return names[pl] ? '$'+names[pl] : str;
                    }).replace(/@([a-zA-Z][a-zA-Z0-9_]*)/g, function (str, pl) {
                        return names[pl] ? '@'+names[pl] : str;
                    });
            }
            action = action
                // replace references to $$ with this.$, and @$ with this._$
                .replace(/([^'"])\$\$|^\$\$/g, '$1this.$').replace(/@[0$]/g, "this._$")

                // replace semantic value references ($n) with stack value (stack[n])
                .replace(/\$(-?\d+)/g, function (_, n) {
                    return "$$[$0" + (parseInt(n, 10) - rhs.length || '') + "]";
                })
                // same as above for location references (@n)
                .replace(/@(-?\d+)/g, function (_, n) {
                    return "_$[$0" + (n - rhs.length || '') + "]";
                });
            if (action in actionGroups) actionGroups[action].push(label);
            else actionGroups[action] = [label];

            // done with aliases; strip them.
            rhs = rhs.map(function(e,i) { return e.replace(/\[[a-zA-Z_][a-zA-Z0-9_-]*\]/g, '') });
            r = new Production(symbol, rhs, productions.length+1);
            // precedence specified also
            if (handle[2] && operators[handle[2].prec]) {
                r.precedence = operators[handle[2].prec].precedence;
            }
        } else {
            // no action -> don't care about aliases; strip them.
            rhs = rhs.map(function(e,i) { return e.replace(/\[[a-zA-Z_][a-zA-Z0-9_-]*\]/g, '') });
            // only precedence specified
            r = new Production(symbol, rhs, productions.length+1);
            if (operators[handle[1].prec]) {
                r.precedence = operators[handle[1].prec].precedence;
            }
        }
    } else {
        // no action -> don't care about aliases; strip them.
        handle = handle.replace(/\[[a-zA-Z_][a-zA-Z0-9_-]*\]/g, '');
        rhs = handle.trim().split(' ');
        for (i=0; i<rhs.length; i++) {
            if (rhs[i] === 'error') her = true;
            if (!symbols_[rhs[i]]) {
                addSymbol(rhs[i], symbols_, symbolId, symbols);
            }
        }
        r = new Production(symbol, rhs, productions.length+1);
    }
    if (r.precedence === 0) {
        // set precedence
        for (i=r.handle.length-1; i>=0; i--) {
            if (!(r.handle[i] in nonterminals) && r.handle[i] in operators) {
                r.precedence = operators[r.handle[i]].precedence;
            }
        }
    }

    productions.push(r);
    productions_.push([symbols_[r.symbol], r.handle[0] === '' ? 0 : r.handle.length]);
    nonterminals[symbol].productions.push(r);
}

module.exports = buildProduction
