import React from 'react'
import markyMarkdown from 'marky-markdown/dist/marky-markdown.js'
console.log('markyMarkdown =', markyMarkdown)

export default function Markdown ({source}) {
  return <article dangerouslySetInnerHTML={{__html: markyMarkdown(source)}}></article>;
}