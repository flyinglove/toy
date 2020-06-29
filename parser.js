const EOF = Symbol('EOF')// EOF: End Of File

let currentToken = null
let attributeName = null

function emit(token) {
	// if (token.type === 'text')
		console.log(token)
}

function data(c) {
	if (c === '<') {
		return tagOpen
	} else if (c === EOF) {
		emit({
			type: 'EOF'
		})
		return ;
	} else {
		emit({
			type: 'text',
			content: c
		})
		return data
	}
}

function tagOpen(c) {
	if (c === '/') {
		return endTagOpen
	} else if (c.match(/^[a-zA-Z]$/)) {
		currentToken = {
			type: 'startTag',
			tagName: ''
		}
		return tagName(c)
	} else {
		return
	}
}

function endTagOpen() {}

function tagName(c) {
	if (c.match(/^[\t\n\f ]$/)) {
		return beforeAttributeName
	} else if (c === '/') {
		return selfClosingStartTag
	} else if (c.match(/^[a-zA-Z]$/)) {
		currentToken.tagName += c//.toLowerCase()
		return tagName
	} else if (c === '>') {
		emit(currentToken)
		return data
	} else {
		return tagName
	}
}


function selfClosingStartTag(c) {
	if (c === '>') {
		currentToken.isSelfClosing = true
		return data
	} if (c === EOF) {
		// return 
	}

}

function beforeAttributeName(c) {
	if (c.match(/^[\t\n\f]$/)) {
		return beforeAttributeName
	}  else if (c === '>') {
		return data
	} else if (c === '=') {
		return beforeAttributeName
	} else {
		return beforeAttributeName
	}
} 

// function attributeName(c) {
// 	if (c.match(/^[\t\n\f]$/) || c === '/' || c === '>' || c === EOF ) {
// 		return afterAttributeName(c)
// 	} else if (c === '=') {
// 		return beforeAttributeValue
// 	}
// }

// function beforeAttributeValue(c) {
// 	if (c.match(/^[\t\n\f]$/) || c === '/' || c === '>' || c === EOF ) {
// 		return afterAttributeName(c)
// 	}
// }
// function afterAttributeName(c) {
// 	if (c.match( c === '/' || c === '>' || c === EOF ))
// }
module.exports.parseHTML = function parseHTML(html){
	let state = data
	for (let c of html) {
		state = state(c)
	}
	state = state(EOF)
}