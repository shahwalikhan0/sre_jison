// Calculator module using IIFE (Immediately Invoked Function Expression)
var calculator = (function () {
  // Utility function to create key-value pair objects
  var createObject = function (keys, value, obj, length) {
    for (
      obj = obj || {}, length = keys.length;
      length--;
      obj[keys[length]] = value
    );
    return obj;
  };

  // Token definitions
  var tokens = {
    $V0: [1, 3],
    $V1: [1, 4],
    $V2: [1, 5],
    $V3: [1, 6],
    $V4: [1, 7],
    $V5: [1, 9],
    $V6: [1, 10],
    $V7: [1, 11],
    $V8: [1, 12],
    $V9: [1, 13],
    $Va: [1, 14],
    $Vb: [1, 15],
    $Vc: [5, 6, 7, 8, 9, 10, 11, 12, 14],
    $Vd: [5, 6, 7, 14],
    $Ve: [5, 6, 7, 8, 9, 14],
  };

  // Parser structure
  var parser = {
    trace: function () {},
    yy: {},
    symbols_: {
      error: 2,
      expressions: 3,
      e: 4,
      EOF: 5,
      "+": 6,
      "-": 7,
      "*": 8,
      "/": 9,
      "^": 10,
      "!": 11,
      "%": 12,
      "(": 13,
      ")": 14,
      NUMBER: 15,
      E: 16,
      PI: 17,
      $accept: 0,
      $end: 1,
    },
    terminals_: {
      2: "error",
      5: "EOF",
      6: "+",
      7: "-",
      8: "*",
      9: "/",
      10: "^",
      11: "!",
      12: "%",
      13: "(",
      14: ")",
      15: "NUMBER",
      16: "E",
      17: "PI",
    },
    productions_: [
      [0, [3, 2]],
      [4, 3],
      [4, 3],
      [4, 3],
      [4, 3],
      [4, 3],
      [4, 3],
      [4, 2],
      [4, 2],
      [4, 2],
      [4, 3],
      [4, 1],
      [4, 1],
      [4, 1],
    ],
    performAction: function (yytext, yyleng, yylineno, yy, yystate, $$, _$) {
      var $0 = $.length - 1;
      switch (yystate) {
        case 1:
          typeof console !== "undefined"
            ? console.log($[$0 - 1])
            : print($$[$0 - 1]);
          return $$[$0 - 1];
        case 2:
          this.$ = $$[$0 - 2] + $$[$0];
          break;
        case 3:
          this.$ = $$[$0 - 2] - $$[$0];
          break;
        case 4:
          this.$ = $$[$0 - 2] * $$[$0];
          break;
        case 5:
          this.$ = $$[$0 - 2] / $$[$0];
          break;
        case 6:
          this.$ = Math.pow($$[$0 - 2], $$[$0]);
          break;
        case 7:
          this.$ = (function fact(n) {
            return n === 0 ? 1 : fact(n - 1) * n;
          })($$[$0 - 1]);
          break;
        case 8:
          this.$ = $$[$0 - 1] / 100;
          break;
        case 9:
          this.$ = -$$[$0];
          break;
        case 10:
          this.$ = $$[$0 - 1];
          break;
        case 11:
          this.$ = Number(yytext);
          break;
        case 12:
          this.$ = Math.E;
          break;
        case 13:
          this.$ = Math.PI;
          break;
      }
    },
    table: [
      {
        3: 1,
        4: 2,
        7: tokens.$V0,
        13: tokens.$V1,
        15: tokens.$V2,
        16: tokens.$V3,
        17: tokens.$V4,
      },
      { 1: [3] },
      {
        5: [1, 8],
        6: tokens.$V5,
        7: tokens.$V6,
        8: tokens.$V7,
        9: tokens.$V8,
        10: tokens.$V9,
        11: tokens.$Va,
        12: tokens.$Vb,
      },
      {
        4: 16,
        7: tokens.$V0,
        13: tokens.$V1,
        15: tokens.$V2,
        16: tokens.$V3,
        17: tokens.$V4,
      },
      {
        4: 17,
        7: tokens.$V0,
        13: tokens.$V1,
        15: tokens.$V2,
        16: tokens.$V3,
        17: tokens.$V4,
      },
      createObject(tokens.$Vc, [2, 11]),
      createObject(tokens.$Vc, [2, 12]),
      createObject(tokens.$Vc, [2, 13]),
      { 1: [2, 1] },
      {
        4: 18,
        7: tokens.$V0,
        13: tokens.$V1,
        15: tokens.$V2,
        16: tokens.$V3,
        17: tokens.$V4,
      },
      createObject(tokens.$Vc, [2, 7]),
      createObject(tokens.$Vc, [2, 8]),
      createObject(tokens.$Vc, [2, 9]),
      {
        6: tokens.$V5,
        7: tokens.$V6,
        8: tokens.$V7,
        9: tokens.$V8,
        10: tokens.$V9,
        11: tokens.$Va,
        12: tokens.$Vb,
        14: [1, 23],
      },
      createObject(tokens.$Vd, [2, 2], {
        8: tokens.$V7,
        9: tokens.$V8,
        10: tokens.$V9,
        11: tokens.$Va,
        12: tokens.$Vb,
      }),
      createObject(tokens.$Vd, [2, 3], {
        8: tokens.$V7,
        9: tokens.$V8,
        10: tokens.$V9,
        11: tokens.$Va,
        12: tokens.$Vb,
      }),
      createObject(tokens.$Ve, [2, 4], {
        10: tokens.$V9,
        11: tokens.$Va,
        12: tokens.$Vb,
      }),
      createObject(tokens.$Ve, [2, 5], {
        10: tokens.$V9,
        11: tokens.$Va,
        12: tokens.$Vb,
      }),
      createObject([5, 6, 7, 8, 9, 10, 14], [2, 6], {
        11: tokens.$Va,
        12: tokens.$Vb,
      }),
      createObject(tokens.$Vc, [2, 10]),
    ],
    defaultActions: { 8: [2, 1] },
    parseError: function (str, hash) {
      if (hash.recoverable) {
        this.trace(str);
      } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
      }
    },
    parse: function (input) {
      var self = this,
        stack = [0],
        tstack = [],
        vstack = [null],
        lstack = [],
        table = this.table,
        yytext = "",
        yylineno = 0,
        yyleng = 0,
        recovering = 0,
        TERROR = 2,
        EOF = 1,
        args = lstack.slice.call(arguments, 1),
        lexer = Object.create(this.lexer),
        sharedState = { yy: {} };

      // Copy state information from the parser
      for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
          sharedState.yy[k] = this.yy[k];
        }
      }

      lexer.setInput(input, sharedState.yy);
      sharedState.yy.lexer = lexer;
      sharedState.yy.parser = this;

      if (typeof lexer.yylloc == "undefined") {
        lexer.yylloc = {};
      }

      var yyloc = lexer.yylloc;
      lstack.push(yyloc);
      var ranges = lexer.options && lexer.options.ranges;

      if (typeof sharedState.yy.parseError === "function") {
        this.parseError = sharedState.yy.parseError;
      }

      var action,
        reduce,
        gotoState,
        next,
        rule,
        args,
        stackLength = 0;

      // Begin parsing the input
      while (true) {
        action = table[stack[stack.length - 1]][next];
        if (typeof action === "undefined") {
          this.parseError("Unexpected token: " + lexer.yytext, {
            token: next,
            expected: table[stack[stack.length - 1]].join(", "),
          });
        }

        if (action === 1) {
          // Shift action: Move to the next state and push token to stack
          stack.push(next);
          vstack.push(lexer.yytext);
          tstack.push(next);
          lstack.push(lexer.yylloc);

          next = lexer.lex();
          if (next === EOF) {
            return vstack[0];
          }
        } else if (action === 2) {
          // Reduce action: Apply grammar rule
          rule = this.productions_[action - 1];
          var prodLength = rule[1];
          var reducedValue = vstack[vstack.length - prodLength];
          stack = stack.slice(0, stack.length - prodLength);
          vstack = vstack.slice(0, vstack.length - prodLength);
          tstack = tstack.slice(0, tstack.length - prodLength);
          lstack = lstack.slice(0, lstack.length - prodLength);

          var reducedSymbol = rule[0];
          var reduceAction = this.performAction.apply(this, [
            lexer.yytext,
            lexer.yyleng,
            lexer.yylineno,
            sharedState.yy,
            reducedSymbol,
            vstack,
            lexer,
          ]);

          // Push reduced symbol and state onto the stack
          stack.push(reducedSymbol);
          vstack.push(reducedValue);
          tstack.push(reducedSymbol);
          lstack.push(lexer.yylloc);

          // Determine next state based on the reduced symbol
          gotoState = table[stack[stack.length - 1]][reducedSymbol];
          if (gotoState === undefined) {
            this.parseError(
              "Unexpected symbol after reduction: " + reducedSymbol,
              {
                token: reducedSymbol,
              }
            );
          }

          stack.push(gotoState);
        } else {
          // Accept action: Parse complete
          return vstack[0];
        }
      }
    },
  };
})();

// Example usage of the calculator
console.log(calculator.calculate("3 + 5 * (2 - 8)"));
