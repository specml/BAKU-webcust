const fs = require('fs');
const child_process = require('child_process');

const dirList = ['RCOL_1', 'GRAFF', 'Cartier', 'Elluxus', 'GL_JEWELRY', 'GL_Time', 'Chopard', 'RCOL_2', 'FS'];
const targetDir = process.argv[2];

const unnesDirProc = (path) => {
    console.log('recoursive delete - ' + path);
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file) => {
            let curPath = path + '/' + file;
            if (fs.lstatSync(curPath).isDirectory()) unnesDirProc(curPath);
            else fs.unlinkSync(curPath);
        });
        fs.rmdirSync(path);
    }
}

const fileProc = (directory,file) => {
    // console.log('fileProc          - ' + directory + '/' + file);
    let fileStat = fs.statSync(directory + '/' + file);
    if (fileStat.isDirectory()) { unnesDirProc(directory + '/' + file); return; }
    if (fs.existsSync(targetDir + '/' + file)) {
        if (fileStat.size > fs.statSync(targetDir + '/' + file).size) {
            fs.unlinkSync(targetDir + '/' + file);
            fs.renameSync(directory + '/' + file, targetDir + '/' + file);
        } else {
            fs.unlinkSync(directory + '/' + file);
        }
    } else {
        fs.renameSync(directory + '/' + file, targetDir + '/' + file);
    }
};

const dirProc = (dir) => {
    if (!fs.existsSync(dir)) return;
    let dirContain = fs.readdirSync(dir);
    if (dirContain.length==0) return;
    dirContain.forEach((f) => fileProc(dir, f));
    fs.rmdirSync(dir);
    console.log('dirProc remove    - ' + dir);
    console.log('dirProc mklink    - ' + dir);
    child_process.exec('mklink.bat ' + targetDir + ' ' + dir, function(error, stdout, stderr) { });
};

if (!fs.existsSync(targetDir)){
    fs.mkdirSync(targetDir);
}
dirList.forEach((directory) => dirProc(directory));
