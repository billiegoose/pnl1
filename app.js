import React from 'react'
import ReactDOM from 'react-dom'
import GoldenLayout from 'golden-layout'
import Article from './Article.js'
import ParserGenerator from './ParserGenerator.js'

window.React = React
window.ReactDOM = ReactDOM
window.GoldenLayout = GoldenLayout

var TestComponent = React.createClass({
    render: function() {
        return (<h1>{this.props.label}</h1>)
    }
});

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
                props: { label: 'B' }
            },{
                type:'react-component',
                component: 'test-component',
                title: 'Source Code',
                props: { label: 'C' }
            }]
        }]
    }]
});

myLayout.registerComponent( 'test-component', TestComponent );
myLayout.registerComponent( 'Article', Article );
myLayout.registerComponent( 'ParserGenerator', ParserGenerator );

//Once all components are registered, call
myLayout.init();

import './browser.js'