const fs = require('fs');
const path = require('path');
const pathToFiles = process.argv[2];

console.log("Organizing files from " + pathToFiles);

let files = fs.readdirSync(pathToFiles);

const months = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'];

files.forEach(file => {
    let fileCTime = (fs.statSync(path.join(pathToFiles, file))).mtime;
    let fileCTimeYear = fileCTime.getFullYear();
    let fileCTimeMonth = fileCTime.getMonth();
    let currentPath = path.join(pathToFiles, file);
    if(!fs.lstatSync(currentPath).isDirectory()){
        let yearPath = path.join(pathToFiles, fileCTimeYear.toString());
        let monthPath = path.join(yearPath, months[fileCTimeMonth]);
        console.log(monthPath);
        if (!fs.existsSync(yearPath)){
            fs.mkdirSync(yearPath);
        }
        if (!fs.existsSync(monthPath)){
            fs.mkdirSync(monthPath);
        }
        move(currentPath, path.join(monthPath, file), function(){
            console.log("Moved from " + currentPath + " to " + monthPath);
        });
    }
    else {
        console.log('Is directory, ignoring');
    }


});


function move(oldPath, newPath, callback) {

    fs.rename(oldPath, newPath, function (err) {
        if (err) {
            if (err.code === 'EXDEV') {
                copy();
            } else {
                callback(err);
            }
            return;
        }
        callback();
    });

    function copy() {
        var readStream = fs.createReadStream(oldPath);
        var writeStream = fs.createWriteStream(newPath);

        readStream.on('error', callback);
        writeStream.on('error', callback);

        readStream.on('close', function () {
            fs.unlink(oldPath, callback);
        });

        readStream.pipe(writeStream);
    }
}