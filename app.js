// Global CSS
import 'https://golden-layout.com/assets/css/goldenlayout-base.css'
import 'https://golden-layout.com/assets/css/goldenlayout-dark-theme.css'
import './react-contextmenu.css'

// Libraries
import React from 'react'
import ReactDOM from 'react-dom'
import GoldenLayout from 'golden-layout'
window.React = React
window.ReactDOM = ReactDOM
window.GoldenLayout = GoldenLayout

// Application code
import './app.css'
import Article from './Article.js'
import EditableTextFile from './EditableTextFile.js'
import SourceFile from './SourceFile.js'
import ParserGenerator from './ParserGenerator.js'

// Setup
var myLayout = new GoldenLayout({
  content: [{
    type: 'row',
    content:[{
      type:'react-component',
      component: 'Article',
      props: { src: 'Article.md' }
    },{
      type: 'column',
      content:[{
        type:'react-component',
        component: 'ParserGenerator',
        title: 'Parser Generator',
        props: { filepath: 'grammar.pegjs' }
      },{
        type:'react-component',
        component: 'SourceFile',
        title: 'Source Code',
        props: { filepath: 'source1.pnl' }
      }]
    }]
  }]
});
myLayout.registerComponent('Article', Article);
myLayout.registerComponent('EditableTextFile', EditableTextFile);
myLayout.registerComponent('SourceFile', SourceFile);
myLayout.registerComponent('ParserGenerator', ParserGenerator);
myLayout.init();

// TODO: whittle browser.js away to nothing.
import './browser.js'