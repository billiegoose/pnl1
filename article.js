import React from 'react'

export default class Article extends React.Component {
    render () {
        return (<article>
    <p>This is a fairly mind-warping piece of code. It is a compiler for a nonsense language that runs perfectly well in Chrome DevTools
      thanks to Source Maps.</p>
    <p>The grammar of the nonsense language is defined in <a href="grammar.pegjs">grammar.pegjs</a>. It's not total nonsense,
      it basically tokenizes Integers and Identifiers. And pairs in parentheses. And the keyword 'breakpoint' - you'll see why in a moment.
    </p>
    <p>The parser for the grammar is generated using <a href="https://pegjs.org/">PEG.js</a>. It's not generated ahead of time,
      but generated on-the-fly in the browser. [Codegen 1]
    </p>
    <p>
      <a href="browser.js">browser.js</a> imports PEG.js and <a href="https://npm.im/source-map">source-map</a>
      and uses that to transform an input file (<a href="test/fixtures/source1.pnl">test/fixtures/source1.pnl</a>) into a JavaScript file. [Codegen 2]
    </p>
    <p>
      That JavaScript file doesn't actually exist on the server. It's just in the browser's memory.
      The semantics of the transformation are: every AST node translates to 'console.log(&lt;the AST node&gt;);' except for the
      Breakpoint token, which is translated to <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger">'debugger;'</a>.
      This allows us to pause execution inside 'source1.pnl'.
    </p>
    <p>
      The compiler (browser.js), the grammar file (grammar.pegjs), and the source file (source1.pnl) are all loaded using <a href="https://github.com/systemjs/systemjs">SystemJS</a>, which
      is a dynamic module loader. Instead of using a bundler (Webpack or Browserify) I wanted something dynamic so we can
      add a GUI later that lets you edit the grammar file, the parser/compiler, and the source file all in the browser. Anyhoo...
    </p>
    <p>
      browser.js is actually written in ES2015+. When it loads 'browser.js', SystemJS actually compiles it using a Babel plugin. [Codegen 3]
    </p>
    <p>
      SystemJS itself is loaded from <a href="https://unpkg.com">unpkg.com</a> using a &lt;script&gt; tag. Thankfully, that doesn't
      involve any code generation - it's just a CDN that serves up the contents of npm packages.
    </p>
    <p>
      So the full set of operations (in order) is:
      <ol>
        <li>index.html loads SystemJS from unpkg.com with a script tag</li>
        <li>an inline script uses SystemJS to import './browser.js' module, which gets Babelified before its executed</li>
        <li>SystemJS loads 'pegjs' (from ./peg-0.10.0.min.js - for some reason loading from unpkg didn't work) and './grammar.pegjs' on './browser.js's behalf</li>
        <li>pegjs creates a parser from the grammar</li>
        <li>SystemJS loads './source1.pnl' on './browser.js's behalf</li>
        <li>the parser parses the contents of 'source1.pnl' into an AST</li>
        <li>the AST is compiled into JavaScript text and a source map</li>
        <li>the source map is turned into a data URI and appended to the JavaScript text</li>
        <li>the JavaScript text is turned into a File blob</li>
        <li>we obtain a URL for the File blob using URL.createObjectURL</li>
        <li>Then (mind blown) we use SystemJS <i>to import (and execute) the JavaScript "file" we just created</i></li>
        <li>Chrome DevTools re-constructs 'source1.pnl' from the JavaScript "file"</li>
        <li>Part-way through the execution it hits the 'debugger' breakpoint, pauses execution, and highlights the corresponding link in the source file 'source1.pnl'.</li>
        <li>Open DevTools. It should be paused at a breakpoint in the file <code><pre>./test/fixtures/source1.pnl</pre></code>
        under '(no domain)' in the Sources Navigator pane.</li>
        <li>Step through 'source1.pnl' one instruction at a time (F10). For each instruction, the AST node is printed in the console.</li>
      </ol>
    </p>
    <p>
      We are debugging a script written in what is essentially a compile-to-JS language, using source maps and a JavaScript file
      we created in memory, using a compiler that was transpiled by Babel just a moment ago,
      and whose parser didn't exist until it was generated from a grammar file just now. Step aside Just-in-Time-Compilers,
      and behold the Just-in-Time-Parser Compiler-Transpiler-Transpiler!
    </p>
  </article>)
  }
}
