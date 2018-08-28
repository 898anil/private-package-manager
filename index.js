#!/usr/bin/env node

'use strict';


const program = require('commander');
const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp")
const storagePath = path.join(process.cwd(), "storage");

function createLibFolderIfNotExist(){
	mkdirp(path.join(process.cwd(), "lib"))
}

program
    .version('0.0.1')
    .command('install [name]')
    .description('install a file')
    .action((name) => {
        createLibFolderIfNotExist();
        var filePath = path.join(storagePath,name);
        var fileData = fs.readFileSync(filePath)
        var destPath = path.join(process.cwd(),"lib",name);
        fs.writeFileSync(destPath,fileData);
        console.log("file added succesfully in",destPath)
    })

program
    .command('upload [path]')
    .description('upload a file')
    .action((relativeFilepath) => {
        var filePath = path.join(process.cwd(), relativeFilepath)
        var data = fs.readFileSync(filePath);
        fs.writeFileSync(path.join(storagePath, relativeFilepath.split("/").pop()), data);
        console.log("file successfully stored");
    });

program.parse(process.argv);
