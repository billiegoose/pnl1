import React from 'react'
import peg from './peg-0.10.0.min.js'
import grammerFileContent from './grammar.pegjs!text'
import EditableTextFile from './EditableTextFile.js'

export let parser = peg.generate(grammerFileContent)

export default class ParserGenerator extends EditableTextFile {
  constructor (...args) {
    super(...args)
  }
  onChange (newValue) {
    super.onChange(newValue)
    try {
      parser = peg.generate(newValue)
      this.setContainerTitle('Parser Generator')
    } catch (e) {
      this.setContainerTitle('Parser Generator - ✘ "' + e.message + '"')
      console.log(e.message)
    }
  }
}
