#!/usr/bin/env node

'use strict';


const program = require('commander');
const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp")
const utils = require("./util.js");
const fileManager = require("./fileManager.js");

const libFolderName = "lib";

program
    .version('0.0.1')

program
    .command('get [name]')
    .description('download a file')
    .action(async (name) => {
        try{
            var fileData = await fileManager.getFile(name);
            utils.createFolderIfNotExist(libFolderName);
            var destPath = path.join(process.cwd(),libFolderName,name);
            fs.writeFileSync(destPath,fileData);
            console.log("file added succesfully in",destPath)    
        }
        catch(e){
            console.log(e)
        }
        
    })

program
    .command('upload [path]')
    .description('upload a file')
    .action(async (relativeFilepath) => {
        try{
            var filePath = utils.resolvePath(relativeFilepath);  
            await fileManager.uploadFile(filePath)
            console.log("file uploaded succesfully")    
        }
        catch(e){
            console.log(e);
        }
        
    });

program.parse(process.argv);
