/*
 * ALL KEYWORDS
 * 
 * GOTO
 * GOTOIF
 * GOTOIFNOT
 * GOTOIFELSE
 * PRINT
 * VAR
 * SETVAR
 * ADD
 * SUB
 * MOD
 * NUMBER
 * STRING
 * */

export var keywords = {
	GOTO(line) {
		if (typeEquals(line, "number")) {
			programLine = line.value-2
		} else {
			throw "error at line " + (programLine+1) + " in function GOTO"
		}
	},
	GOTOIF(line, condition) {
		if (typeEquals(line, "number") && typeEquals(condition, "bool")) {
			if (condition.value) {
				programLine = line.value-2
			} else {
				//programLine++
			}
		} else {
			throw "error at line " + (programLine+1) + " in function GOTOIF"
		}
	},
	GOTOIFELSE(lineTrue, lineFalse, condition) {
		if (typeEquals(lineTrue, "number") && typeEquals(lineFalse, "number") && typeEquals(condition, "bool")) {
			if (condition.value) {
				programLine = lineTrue.value-2
			} else {
				programLine = lineFalse.value-2
			}
		} else {
			throw "error at line " + (programLine+1) + " in function GOTOIFELSE"
		}
	},
	GOTOIFNOT(line, condition) {
		if (typeEquals(line, "number") && typeEquals(condition, "bool")) {
			if (!condition.value) {
				programLine = line.value-2
			} else {
				// programLine++
			}
		} else {
			throw "error at line " + (programLine+1) +  + " in function GOTOIFNOT"
		}
	},
	PRINT(string) {
		console.log(string.value)
		// programLine++
	},
	VAR(name, value) {
		if (typeEquals(name, "string") && !varExists(name)) {
			variables[name.value] = value
		} else {
			throw "error at line " + (programLine+1) + " in function VAR"
		}
		// programLine++
	},
	SETVAR(name, value) {
		if (typeEquals(name, "string") && varExists(name)) {
			variables[name.value].type = value.type
			variables[name.value].value = value.value
		} else {
			throw "error at line " + (programLine+1) + " in function SETVAR"
		}
		// programLine++
	},
	ADD (val1, val2, varname) {
		if (typeEquals(varname, "string") && typeEquals(val1, "number") && typeEquals(val2, "number") && varExists(varname)) {
			variables[varname.value].value = val1.value + val2.value
		} else if (typeEquals(varname, "string") && typeEquals(val1, "string") && typeEquals(val2, "string") && varExists(varname)) {
			variables[varname.value].value = val1.value + val2.value
		} else {
			throw "error at line " + (programLine+1) + " in function ADD"
		}
		// programLine++
	},
	SUB (val1, val2, varname) {
		if (typeEquals(varname, "string") && typeEquals(val1, "number") && typeEquals(val2, "number") && varExists(varname)) {
			variables[varname.value].value = val1.value - val2.value
			// programLine++
		} else {
			throw "error at line " + (programLine+1) + " in function SUB"
		}
	},
	MOD (val1, val2, varname) {
		if (typeEquals(varname, "string") && typeEquals(val1, "number") && typeEquals(val2, "number") && varExists(varname)) {
			// console.log(val1.value, val2.value, val1.value % val2.value);
			variables[varname.value].value = val1.value % val2.value
			// programLine++
		} else {
			throw "error at line " + (programLine+1) + " in function MOD"
		}
	},
	NUMBER(value, varname) {
		if (typeEquals(varname, "string") && varExists(varname)) {
			variables[varname.value].type = "number"
			variables[varname.value].value = Number(value.value)
			// programLine++
		} else {
			throw "error at line " + (programLine + 1) + " in function NUMBER"
		}
	},
	STRING(value, varname) {
		if (typeEquals(varname, "string") && varExists(varname)) {
			variables[varname.value].type = "string"
			variables[varname.value].value = String(value.value)
			//console.log(variables["count"])
		} else {
			throw "error at line " + (programLine + 1) + " in function STRING"
		}
	}
}

var variables = {
	true: {type: "bool", value: true},
	false: {type: "bool", value: false}
}
const defaultVariables = Object.assign({}, variables)
var programLine = -1

function typeEquals(value, type) {
	return value.type == type;
}
function varExists(value) {
	return variables.hasOwnProperty(value.value)
}


export function incrementLine() {programLine++}
export function setVariables(newState) {
	variables = Object.assign({}, newState)
}

function parseLine(code) {
	// console.log(code)
	code = skipSpace(code)
	let match
	let line = Object.create(null)
	if (match = /^([A-Z]+)(\s)?/.exec(code)) {
		if (keywords.hasOwnProperty(match[1])) {
			let keyword = match[1]
			code = code.slice(match[1].length, code.length)
			code = skipSpace(code)
			let values = code.split(" ").filter(a => a.length > 0)

			for (let i = 0; i < values.length; i++) {
				let value = values[i]
				values[i] = evaluate(value)
			}

			line = {keyword: keyword, args: values}
			return line;
		} else {
			throw "keyword does not exist, line " + (programLine+1)
		}
	} else {
		throw "lines must start with a keyword, line " + (programLine+1)
	}
}

function evaluate(value) {
	let match
	if (/^[0-9]+$/.exec(value)) {
		return {type: "number", value: Number(value)}

	} else if (/^[a-z]+$/.exec(value)) {
		if (variables.hasOwnProperty(value)) {
			return /*evaluate(*/variables[value]/*)*/
		} else {
			throw "variable " + value + " does not exist, line " + (programLine+1)
		}

	} else if (match = /^"([a-zA-Z\-_0-9]*)"$/.exec(value)) {
		return {type: "string", value: match[1]}

	} else if (match = /^([a-z]+|[0-9]+)([=<>])([a-z]+|[0-9]+)$/.exec(value)) {
		let num1 = evaluate(match[1])
		let num2 = evaluate(match[3])
		let operator = match[2]
		let result
		if (!typeEquals(num1, "number") || !typeEquals(num2, "number")) throw "booleans can only be constructed with numbers, line " + (programLine+1)
		if (operator == "=") {
			result = num1.value == num2.value
		} else if (operator == "<") {
			result = num1.value < num2.value
		} else {
			result = num1.value > num2.value
		}
		return {type: "bool", value: result}
	} else if (match = /^([a-z]+|"[a-zA-Z]*")=([a-z]+|"[a-zA-Z]*")$/.exec(value)) {

		let val1 = evaluate(match[1])
		let val2 = evaluate(match[2])

		// console.log(val1, val2);

		if (typeEquals(val1, "string") && typeEquals(val2, "string")) {
			return {type: "bool", value: val1.value == val2.value}
		}
	} else {
		throw "data type of " + value + " does not exist, line " + (programLine+1)
	}
}

function runLine(line) {
	//console.log(line)
	keywords[line.keyword](...line.args)
}

function skipSpace(string) {
	let first = string.search(/\S/)
	if (first == -1) return ""
	return string.slice(first)
}

export function runProgram(program) {
	if (program) {
		programLine = -1
		program = program.split("\n").filter(line => line.length > 1)
		variables = Object.assign({}, defaultVariables)
		console.log(variables)
		while (programLine < program.length-1) {
			programLine++
			console.log(parseLine(program[programLine]));
			console.log(program[programLine]);
			runLine(parseLine(program[programLine]))
			console.log(JSON.stringify(variables));
		}
	}
}
