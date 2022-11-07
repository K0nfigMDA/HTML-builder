const path = require('path')
const fs = require('fs')
const {mkdir, copyFile, readdir, readFile, writeFile} = require('fs/promises')
const stylesPath = path.join(__dirname, 'styles')


async function createHtmlCss(){
	try {
	let htmlArr = []
	let cssArr = []
	


	let indexhtmlString = await readFile(path.join(__dirname, 'template.html' ), 'utf-8')
	let result = indexhtmlString.match(/{{.*}}/g)
	
	let resultHtmlString = indexhtmlString
	
	for (const el of result) {
		let comp = await readFile(path.join(__dirname, 'components', `${el.slice(2,-2)}.html`), 'utf-8')
		resultHtmlString = resultHtmlString.replace(el, comp)
	}

	await writeFile(path.join(__dirname, 'project-dist', 'index.html' ), resultHtmlString)


	const files = await readdir(stylesPath, {withFileTypes: true})
	for (const file of files) {
			cssArr.push(await readFile(path.join(__dirname, 'styles', file.name ), 'utf-8'))
		}
		await writeFile(path.join(__dirname, 'project-dist', 'style.css' ), cssArr.join('\r\n'))
	} 
	
catch (err) {
	console.error(err.message)}
}

createHtmlCss()

async function createAssets(ourFolderPath, copyFolderPath){
	try {
	await mkdir(copyFolderPath, {recursive: true })
	const files = await readdir(ourFolderPath, {withFileTypes: true})
	for (const file of files) {
		if(file.isDirectory()) {
			createAssets(path.join(ourFolderPath, file.name), path.join(copyFolderPath, file.name))  
		}
		else {copyFile(path.join(ourFolderPath, file.name), path.join(copyFolderPath, file.name))}
	}
	
}
catch (err) {
	console.error(err.message)
}}

createAssets(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets') )