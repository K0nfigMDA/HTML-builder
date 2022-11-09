const path = require('path')
const fs = require('fs')
const {mkdir, copyFile, readdir, rm} = require('fs/promises')

async function createCopyFolder(ourFolderPath, copyFolderPath){
	try {
	await rm(copyFolderPath, {recursive: true, force: true})
	await mkdir(copyFolderPath, {recursive: true })
	const files = await readdir(ourFolderPath, {withFileTypes: true})
	for (const file of files) {
		if(file.isDirectory()) {
			createCopyFolder(path.join(ourFolderPath, file.name), path.join(copyFolderPath, file.name))  
		}
		else {copyFile(path.join(ourFolderPath, file.name), path.join(copyFolderPath, file.name))}
	}
	
}
catch (err) {
	console.error(err.message)
}}

createCopyFolder(path.join(__dirname, 'files'), path.join(__dirname, 'files-copy') )

