import React from 'react'
import Markdown from './Markdown.js'

export default class Article extends React.Component {
  constructor ({src}) {
    super();
    this.state = {
      source: ''
    }
    fetch(src).then(res => res.text()).then(text => {
      this.setState({source: text})
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
