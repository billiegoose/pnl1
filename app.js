import React from 'react'
import ReactDOM from 'react-dom'
import GoldenLayout from 'golden-layout'
import Article from './article.js'

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
            component: 'article',
            title: 'Article',
            props: { label: 'A' }
        },{
            type: 'column',
            content:[{
                type:'react-component',
                component: 'test-component',
                props: { label: 'B' }
            },{
                type:'react-component',
                component: 'test-component',
                props: { label: 'C' }
            }]
        }]
    }]
});

myLayout.registerComponent( 'test-component', TestComponent );
myLayout.registerComponent( 'article', Article );

//Once all components are registered, call
myLayout.init();

import './browser.js'