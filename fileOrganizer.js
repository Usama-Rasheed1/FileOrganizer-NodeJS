const { log } = require('console');
const fs = require('fs');
const path = require('path');


let directoryPath='./';

fs.readdir(directoryPath, (err, files)=>{
  if(err){
    console.log("cant read Dir", err);
    return 
  }

  files.forEach(file=>{

    if(file==='fileOrganizer.js'){
      return
    }
    const fileExtension = path.extname(file).slice(1);
    if(fileExtension)
    {
      const folderName = path.join(directoryPath, fileExtension);

      if(!fs.existsSync(folderName)){
        fs.mkdirSync(folderName);
      }

      const oldPath = path.join(directoryPath, file);
      const newPath = path.join(folderName, file);

      fs.rename(oldPath, newPath, (err)=>{
        if(err){
          console.log(`Cant move file ${file}:`, err);
        }
        else{
          console.log(`File ${file} moved to ${folderName}`);
        }
      });
    }
  });

});