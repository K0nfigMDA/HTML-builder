const path = require('path')
const fs = require('fs')
const ourPath = path.join(__dirname, 'text.txt')
const { stdout, stdin } = process;

const output = fs.createWriteStream(ourPath);

process.on('exit', () => stdout.write('Пасиб за работу, пока)'));

console.log('Введите данные:')


stdin.on('data', data => {
	const stringData = data.toString()
	if(stringData === 'exit\r\n' || stringData === 'exit\n' ) {
		process.exit()
	}
	output.write(stringData)})

process.on('SIGINT', () => process.exit())







