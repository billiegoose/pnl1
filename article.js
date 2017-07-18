import React from 'react'
import Markdown from './Markdown.js'
import fs from 'fs'

function fetchFromLocalFS (src) {
  return new Promise(function(resolve, reject) {
    fs.readFile(src, 'utf8', (err, file) => {
      return err ? reject(err) : resolve(file)
    })
  })
}

function fetchDefaultFile (src) {
  return fetch(src).then(res => res.text()).then(text => {
    return new Promise(function(resolve, reject) {
      fs.writeFile('/'+src, text, err => err ? reject(err) : resolve(text))
    })
  })
}

export default class Article extends React.Component {
  constructor ({src}) {
    super();
    this.state = {
      source: ''
    }
    fetchFromLocalFS(src)
    .then(text => this.setState({source: text}))
    .catch(err => {
      fetchDefaultFile(src)
      .then(text => this.setState({source: text}))
      .catch(err => console.log)
    })
  }
  setContainerTitle (title) {
    this.props.glContainer.setTitle(title)
  }
  render () {
    this.setContainerTitle(this.props.src)
    return (<Markdown source={this.state.source}/>)
  }
}
