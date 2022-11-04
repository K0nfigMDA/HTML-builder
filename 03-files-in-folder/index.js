const fs = require('fs')

const { readdir, open } = require('fs/promises')
const path = require('path')
const ourPath = path.join(__dirname, 'secret-folder')



async function readFiles () {
	try {
  const files = await readdir(ourPath, {withFileTypes: true});
  for (const file of files) {
	let fileOpen
	let fileStat
	let filePath = path.join(__dirname, 'secret-folder', file.name)
	try {
		fileOpen = await open(filePath, 'r')
		const stat = await fileOpen.stat()

		fileStat = stat
	} finally {
		await fileOpen.close()
	}

	if(!file.isDirectory()) {console.log(`${path.basename(file.name, path.extname(file.name))} - ${path.extname(file.name).substring(1)} - ${fileStat.size/1024}kb`)
	}}
} catch (err) {
  console.error(err);
}}

readFiles()




