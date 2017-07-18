This is a fairly mind-warping piece of code. It is a compiler for a nonsense language that runs perfectly well in Chrome DevTools
thanks to Source Maps.

The grammar of the nonsense language is defined in [grammar.pegjs](grammar.pegjs). It's not total nonsense,
it basically tokenizes Integers and Identifiers. And pairs in parentheses. And the keyword "`breakpoint`" - you'll see why in a moment.

The parser for the grammar is generated using [PEG.js](https://pegjs.org/). It's not generated ahead of time,
but generated on-the-fly in the browser. [Codegen 1]

[browser.js](browser.js) imports PEG.js and [source-map](https://npm.im/source-map)
and uses that to transform an input file ([source1.pnl](source1.pnl)) into a JavaScript file. [Codegen 2]

That JavaScript file doesn't actually exist on the server. It's just in the browser's memory.
The semantics of the transformation are: every AST node translates to `console.log(<the AST node>);` except for the
Breakpoint token, which is translated to [`debugger;`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger).
This allows us to pause execution inside "`source1.pnl`".

The compiler (browser.js), the grammar file (grammar.pegjs), and the source file (source1.pnl) are all loaded using [SystemJS](https://github.com/systemjs/systemjs), which
is a dynamic module loader. Instead of using a bundler (Webpack or Browserify) I wanted something dynamic so we can
add a GUI later that lets you edit the grammar file, the parser/compiler, and the source file all in the browser. Anyhoo...

browser.js is actually written in ES2015+. When it loads 'browser.js', SystemJS actually compiles it using a Babel plugin. [Codegen 3]

SystemJS itself is loaded from [unpkg.com](https://unpkg.com) using a `<script>` tag. Thankfully, that doesn't
involve any code generation - it's just a CDN that serves up the contents of npm packages.

So the full set of operations (in order) is:

1.  index.html loads SystemJS from unpkg.com with a script tag
2.  an inline script uses SystemJS to import './browser.js' module, which gets Babelified before its executed
3.  SystemJS loads 'pegjs' (from ./peg-0.10.0.min.js - for some reason loading from unpkg didn't work) and './grammar.pegjs' on './browser.js's behalf
4.  pegjs creates a parser from the grammar
5.  SystemJS loads './source1.pnl' on './browser.js's behalf
6.  the parser parses the contents of 'source1.pnl' into an AST
7.  the AST is compiled into JavaScript text and a source map
8.  the source map is turned into a data URI and appended to the JavaScript text
9.  the JavaScript text is turned into a File blob
10.  we obtain a URL for the File blob using URL.createObjectURL
11.  Then (mind blown) we use SystemJS *to import (and execute) the JavaScript "file" we just created*
12.  Chrome DevTools re-constructs 'source1.pnl' from the JavaScript "file"
13.  Part-way through the execution it hits the 'debugger' breakpoint, pauses execution, and highlights the corresponding link in the source file 'source1.pnl'.
14.  Open DevTools. It should be paused at a breakpoint in the file `./source1.pnl` under '(no domain)' in the Sources Navigator pane.
15.  Step through `source1.pnl` one instruction at a time (F10). For each instruction, the AST node is printed in the console.

We are debugging a script written in what is essentially a compile-to-JS language, using source maps and a JavaScript file
we created in memory, using a compiler that was transpiled by Babel just a moment ago,
and whose parser didn't exist until it was generated from a grammar file just now. Step aside Just-in-Time-Compilers,
and behold the Just-in-Time-Parser Compiler-Transpiler-Transpiler!