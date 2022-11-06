const fs = require('fs')

const { readdir, readFile, writeFile } = require('fs/promises')
const path = require('path');
const ourPath = path.join(__dirname, 'styles')




async function readFiles () {
	try {
  const files = await readdir(ourPath, {withFileTypes: true})
	let arr = []
  for (const file of files) {
	if(!file.isDirectory() && path.extname(file.name) === '.css') {
		arr.push(await readFile(path.join(__dirname, 'styles', file.name ), 'utf-8'))
	} 
	}
	await writeFile(path.join(__dirname, 'project-dist', 'bundle.css' ), arr.join('\r\n'))
} catch (err) {
  console.error(err);
	
}}

readFiles()




