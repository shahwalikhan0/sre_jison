var Generator = require("jison").Generator;
var grammar = require("./grammar").grammar;
var options = require("./options").options;

class ParserGenerator {
  constructor(grammar, options) {
    this.grammar = grammar;
    this.options = options;
  }

  generateParser() {
    // Create an instance of the Jison Generator and generate the parser code
    var code = new Generator(this.grammar, this.options).generate();
    return code;
  }
}

module.exports = ParserGenerator;
