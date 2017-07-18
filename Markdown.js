import React from 'react'
import markyMarkdown from 'marky-markdown/dist/marky-markdown.js'

export default function Markdown ({source}) {
  return <article dangerouslySetInnerHTML={{__html: markyMarkdown(source)}}></article>;
}