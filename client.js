import {keywords, runProgram, incrementLine, setVariables} from "./messylang.js"

let run = document.getElementById('run')
let code = document.getElementById('code')
let numbers = document.getElementById('numbers')
let output = document.getElementById('output')

let save = document.getElementById('save')
let name = document.getElementById('project-name')
let upload = document.getElementById('file')

// let defaultVariables = {false: {type: "bool", value: false}, true: {type: "bool", value: true}}
// setVariables(defaultVariables)
updateNumbers()

keywords.PRINT = function(string) {
	let line = document.createElement("div")
	line.innerHTML = string.value
	document.getElementById("output").appendChild(line)
	// incrementLine()
}

code.addEventListener("scroll", () => {
	numbers.scrollTop = code.scrollTop
})
numbers.addEventListener("scroll", () => {
	code.scrollTop = numbers.scrollTop
})

code.addEventListener("input", () => {
	updateNumbers()

})

function updateNumbers() {
	numbers.innerHTML = ""

	code.value.split("\n").forEach((_, i) => {
		let num = document.createElement("div")
		num.innerHTML = (i+1) + ".&nbsp;"
		numbers.appendChild(num)
	});
}

upload.addEventListener("change", () => {
	if (upload.files) {
		let file = upload.files[0]
		let reader = new FileReader();
		reader.addEventListener("load", () => {
			if (file.name.match(/\.messy$/) && reader.result.match(/[ A-Za-z0-9<>="\n]+/) == reader.result && confirm("Loading a file will overwrite your current project!")) {
				name.value = file.name.slice(0, file.name.length-6)
				code.value = reader.result
				updateNumbers()
			}
		})
		reader.readAsText(file)
	}
})

run.addEventListener("click", () => {
	output.innerText = ""
	// setVariables(defaultVariables)
	try {
		runProgram(code.value)
	} catch (e) {
		let line = document.createElement("div")
		line.innerHTML = e
		document.getElementById("output").appendChild(line)
	}
})

save.addEventListener("click", () => {
	saveFile(code.value, name.value)
})
function saveFile(content, name) {
	let blob = new Blob([content], {type: 'text/plain'})
	let objectURL = URL.createObjectURL(blob)
	let download = document.getElementById("download-link")
	download.download = name + ".messy"
	download.href = objectURL
	download.click()
	URL.revokeObjectURL(objectURL)
}

let keys = {
	shift: false,
	enter: false
}
code.addEventListener("keydown", event => {
	if (event.keyCode === 16) {
		keys.shift = true
	} else if (event.keyCode === 13) {
		keys.enter = true;
	}
	if (keys.shift && keys.enter) {
		event.preventDefault()
		run.click();
		keys.enter = false;
		keys.shift = false;
	}
});
code.addEventListener("keyup", event => {
	if (event.keyCode === 16) {
		keys.shift = false
	} else if (event.keyCode === 13) {
		keys.enter = false
	}
});
