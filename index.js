// const parser = require('./parser.js')
const fs = require('fs')
const peg = require('pegjs')
const {SourceNode} = require('source-map')
const util = require('util')

const grammarFile = 'grammar.pegjs'
const sourceFile = 'test/fixtures/source1.pnl'
const destDir = 'dist'
const destFile = 'source1.pnl.js'
const mapFile = 'source1.pnl.js.map'
const htmlFile = 'index.html'

const parser = peg.generate(fs.readFileSync(grammarFile, 'utf8'))
const source = fs.readFileSync(sourceFile, 'utf8')
let result = parser.parse(source, {locations: true})
console.log(result)

function assemble (node) {
  let thingy = (node.token == 'pair')
    ? [assemble(node.value.left), assemble(node.value.right)]
    : `console.log(\`${util.inspect(node)}\`)\n`
  let namey = (node.token == 'identifier')
    ? node.text
    : undefined
  return new SourceNode(
    node.location.start.line,
    node.location.start.column - 1,
    sourceFile,
    thingy,
    namey
  )
}

let output = new SourceNode()
output.setSourceContent(sourceFile, source)

for (var i = 0; i < result.length; i++) {
  output.add(assemble(result[i]))
}

let {code, map} = output.toStringWithSourceMap({file: destFile})
fs.writeFileSync(destDir + '/' + destFile, code.toString() + '\n//@ sourceMappingURL=' + mapFile, 'utf8')
fs.writeFileSync(destDir + '/' + mapFile, map.toString(), 'utf8')
fs.writeFileSync(destDir + '/' + htmlFile, `<script src="${destFile}"></script>`)