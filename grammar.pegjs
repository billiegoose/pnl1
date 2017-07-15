{
  var locations = options.locations || false
  var nameList = []
  function Token (token, value) {
  	var t = {
      	token: token,
      	text: text(),
          value: value
      }
      if (locations) t.location = location()
      return t
  }
}
start
	= Expression +

Expression
  = Pair
  / Breakpoint
  / Identifier
  / Integer

Pair "pair"
  = "(" left:Expression right:Expression ")" _ { return Token('pair', {left, right}) }

Identifier "identifier"
  = [a-z]+ _ {
    	if (nameList.indexOf(text()) < 0) nameList.push(text())
      return Token('identifier', nameList.indexOf(text()))
    }

Integer "integer"
  = [0-9]+ _ { return Token('integer', parseInt(text(), 10)) }

Breakpoint "breakpoint"
  = "breakpoint" _ { return Token('breakpoint', 'debugger;\n') }

_ "whitespace"
  = [ \t\n\r]* { return Token('whitespace') }
