const fs = require('fs');
const path = require('path');
// namedate
// mtime
const sortType = process.argv[2];
const pathToFiles = process.argv[3];

console.log("Organizing files from " + pathToFiles);

let files = fs.readdirSync(pathToFiles);

const months = ['1 - janvier', '2 - fevrier', '3 - mars', '4 - avril', '5 - mai', '6 - juin', '7 - juillet', '8 - aout', '9 - septembre', '10 - octobre', '11 - novembre', '12 - decembre'];


if (sortType === "mtype") {
    files.forEach(file => {
        let times = getMtime(file);
        let fileCTimeYear = times[0].toString();
        let fileCTimeMonth = times[1];
        let currentPath = path.join(pathToFiles, file);
        if (!fs.lstatSync(currentPath).isDirectory()) {
            let yearPath = path.join(pathToFiles, fileCTimeYear);
            let monthPath = path.join(yearPath, months[fileCTimeMonth]);
            console.log(monthPath);
            if (!fs.existsSync(yearPath)) {
                fs.mkdirSync(yearPath);
            }
            if (!fs.existsSync(monthPath)) {
                fs.mkdirSync(monthPath);
            }
            move(currentPath, path.join(monthPath, file), function () {
                console.log("Moved from " + currentPath + " to " + monthPath);
            });
        }
        else {
            console.log('Is directory, ignoring');
        }
    });
}

else if (sortType === "namedate") {
    files.forEach(file => {
        let time = getTime(file);
        let year = time[0].toString();
        let month = time[1];
        console.log(year + " " + month);
        let currentPath = path.join(pathToFiles, file);
        if (!fs.lstatSync(currentPath).isDirectory()) {
            let yearPath = path.join(pathToFiles, year);
            let monthPath = path.join(yearPath, months[month]);
            if (!fs.existsSync(yearPath)) {
                fs.mkdirSync(yearPath);
            }
            if (!fs.existsSync(monthPath)) {
                fs.mkdirSync(monthPath);
            }
            move(currentPath, path.join(monthPath, file), function () {
                console.log("Moved from " + currentPath + " to " + monthPath);
            });
        }
        else {
            console.log('Is directory, ignoring');
        }
    });
}
else {
    console.log("sort type not supported");
}

function getTime(fileName) {
    // Match "YYYYMMDD" in file name
    var rePattern = new RegExp(/(20\d{2})(\d{2})(\d{2})/);
    var result = fileName.match(rePattern);
    console.log(fileName);
    console.log( " is in name " + result);
    if (result === null) {
        console.log("Date is not in name, using mtime");
        let times = getMtime(fileName);
        return [times[0], times[1]];
    }
    else {
        let year = result[1];
        let month = result[2];
        return [year, parseInt(month) - 1];
    }
}

function getMtime(fileName) {
    let fileCTime = (fs.statSync(path.join(pathToFiles, fileName))).mtime;
    let fileCTimeYear = fileCTime.getFullYear();
    let fileCTimeMonth = fileCTime.getMonth();
    return [fileCTimeYear, fileCTimeMonth];
}

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