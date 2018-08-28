const path = require("path");
const mkdirp = require("mkdirp");
function resolvePath(relativeFilepath){
	var filePath = path.join(process.cwd(), relativeFilepath)
	return filePath;
}

function createFolderIfNotExist(folderName='lib'){
	mkdirp.sync(path.join(process.cwd(), folderName))
}

module.exports = {
	resolvePath,
	createFolderIfNotExist
}