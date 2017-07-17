import peg from './peg-0.10.0.min.js'
const grammarFile = 'grammar.pegjs'
const sourceFile = './test/fixtures/source1.pnl'
const destDir = 'dist'
const destFile = 'source1.pnl.js'
const mapFile = 'source1.pnl.js.map'
const htmlFile = 'index.html'

import {parser} from './ParserGenerator.js'
import source from './test/fixtures/source1.pnl!text';

let result = parser.parse(source, {locations: true})

import sourceMap from 'source-map/dist/source-map.min.js'
const SourceNode = sourceMap.SourceNode
function assemble (node) {
  let thingy = (node.token === 'pair')
    ? [assemble(node.value.left), assemble(node.value.right)]
    : (node.token === 'breakpoint')
    ? 'debugger;\n'
    : `console.log(\`${JSON.stringify(node)}\`)\n`
  let namey = (node.token === 'identifier')
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
let mapFileContents = map.toString()
let mapObjectURL = URL.createObjectURL(new File([mapFileContents], mapFile, {teyp: 'application/json'}))
let destFileContents = code.toString() + '\n//@ sourceMappingURL=' + 'data:application/json;base64,' + btoa(mapFileContents) //+ mapObjectURL // + mapFile
let destObjectURL = URL.createObjectURL(new File([destFileContents], destFile, {type: 'application/javascript'}))
fetch(mapObjectURL).then(res => res.text()).then(res => {
  SystemJS.import(destObjectURL)
})