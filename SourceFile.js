import React from 'react'
import EditableTextFile from './EditableTextFile.js'

import {parser} from './ParserGenerator.js'

export let AST = {}

export function parse (source) {
  AST = parser.parse(source, {locations: true})
  console.log(AST)
}

export default class SourceFile extends EditableTextFile {
  constructor (...args) {
    super(...args)
  }
  runCommand () {
    return parse(this.state.unsavedContent)
  }
}
