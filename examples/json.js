var ParserGenerator = require("./generator");

function main() {
  // Instantiate the ParserGenerator
  var parserGenerator = new ParserGenerator();

  // Generate the parser code
  var code = parserGenerator.generateParser();

  // Log the generated code
  console.log(code);
}

if (require.main === module) {
  main();
}
