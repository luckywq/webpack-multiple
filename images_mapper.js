const fs = require('fs');
const path = require('path');

const ignore = [
	'.DS_Store' // macos file record
];
const _input = 'src/images/';
const input = path.resolve('./', _input);
const output = path.resolve('./src', 'images_map.json');
const result = {
	paths: []
};

fs.readdir(input, (err, files) => {
	files.forEach(file => {
		if (isIgnore(file)) return;
		result.paths.push(file);
	});
	fs.writeFileSync(output, JSON.stringify(result));
});

function isIgnore(filename) {
	return ignore.find(item => item.toLowerCase() === filename.toLowerCase());
}