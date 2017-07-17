import React from 'react'
import peg from './peg-0.10.0.min.js'
import grammerFileContent from './grammar.pegjs!text'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'

export let parser = peg.generate(grammerFileContent)

export default class ParserGenerator extends React.Component {
  constructor () {
    super()
  }
  setContainerTitle (title) {
    this.props.glContainer.setTitle(title)
  }
  onChange (newValue) {
    try {
      parser = peg.generate(newValue)
      this.setContainerTitle('Parser Generator')
    } catch (e) {
      this.setContainerTitle('Parser Generator - ✘ "' + e.message + '"')
      console.log(e.message)
    }
  }
  render () {
    let onChange = this.onChange.bind(this)
    return (
      <AceEditor
        mode="javascript"
        theme="monokai"
        width="100%"
        height="100%"
        defaultValue={grammerFileContent}
        onChange={onChange}
        editorProps={{$blockScrolling: true}}
      />
    );
  }
}
