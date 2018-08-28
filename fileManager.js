const path = require("path")
const fs = require("fs");
const mkdirp = require("mkdirp");
const storagePath = path.join(process.env.HOME, ".pm","storage");
mkdirp.sync(storagePath);
function uploadFile(filePath){
	return new Promise((resolve,reject)=>{
		var data = fs.readFileSync(filePath);
		fs.writeFileSync(path.join(storagePath, filePath.split("/").pop()), data);
		resolve();	
	})	
	
}
function getFile(name){
	return new Promise((resolve,reject)=>{
		var filePath = path.join(storagePath,name);
		var fileData = fs.readFileSync(filePath)
		resolve(fileData);		
	})
}

module.exports = {
	uploadFile,
	getFile
}