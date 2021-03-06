const fs = window.require('fs');

export default class FileSystem {

    constructor() {
        this.ignoreList = [];
    
        this.os = window.navigator.platform.substring(0, 3).toLowerCase();
        this.separator = this.os === 'win' ? '\\' : '/';
    }

    // copy files
    copy = (from, to, path) => fs.copyFileSync(from + this.separator + path, to + this.separator + path);

    // delete files
    delete = path => fs.unlinkSync(path);

    // check for changes
    fileChange = (fileA, fileB, ignoreDate) => {
        const timeA = fs.statSync(fileA).mtime;
        const timeB = fs.statSync(fileB).mtime;
        return timeA > timeB || (ignoreDate && (timeB > timeA));
    }

    // filter ignored files and directories
    filterIgnored = (root, elem) => !this.ignoreList.includes(this.separator + elem) && !this.ignoreList.includes(root + this.separator + elem);

    // get directories in the current directory
    getCurDir = dir => fs.readdirSync(dir).filter(elem => fs.statSync(dir + this.separator + elem).isDirectory());

    // get connected removable devices
    getLocalDevices = () => {
        let drives = [];
        let prefix = '';
        switch (this.os) {
            case 'win':
                const drive = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
                drive.forEach(letter => {
                    try {
                        const dir = letter + ':\\';
                        fs.readdirSync(dir);
                        drives.push(dir);
                    }
                    catch (err) { }
                });
                return drives;
            case 'mac':
                prefix = '/Volumes';
                break;
            default:
                prefix = '/media/' + fs.readdirSync('/media')[0];
                break;
        }
        return fs.readdirSync(prefix).map(drive => prefix + '/' + drive);
    }

    // mirror directory structure + mark changed files
    scanDir = (rootA, rootB, onNewA, onNewB, ignoreDate) => this.scanDirRec(rootA, rootB, rootA, rootB, onNewA, onNewB, '', ignoreDate);

    scanDirRec = (rootA, rootB, pathA, pathB, onNewA, onNewB, dir, ignoreDate) => {
        pathA += (dir ? this.separator + dir : '');
        pathB += (dir ? this.separator + dir : '');

        // ensure directories exist
        if (!fs.existsSync(pathA))
            fs.mkdirSync(pathA);
        if (!fs.existsSync(pathB))
            fs.mkdirSync(pathB);

        // get local and remote dir
        const contentA = fs.readdirSync(pathA).filter(elem => this.filterIgnored(pathA, elem));
        const contentB = fs.readdirSync(pathB).filter(elem => this.filterIgnored(pathB, elem));

        // split files and directories from path A and B
        let dirA = [];
        let fileA = [];
        contentA.forEach(dir => (fs.statSync(pathA + this.separator + dir).isDirectory() ? dirA : fileA).push(dir));

        let dirB = [];
        let fileB = [];
        contentB.forEach(dir => (fs.statSync(pathB + this.separator + dir).isDirectory() ? dirB : fileB).push(dir));

        // filter unique directories
        const newDirA = dirB.filter(dirInB => !dirA.includes(dirInB));
        const newDirB = dirA.filter(dirInA => !dirB.includes(dirInA));

        // create directories to match file structure
        newDirA.forEach(newDir => fs.mkdirSync(pathA + this.separator + newDir));
        newDirB.forEach(newDir => fs.mkdirSync(pathB + this.separator + newDir));

        // mark files that a not in sync
        const aHeader = rootA.length + 1;
        fileA.forEach(file => {
            const fileA = pathA + this.separator + file;
            const fileB = pathB + this.separator + file;
            if (!fs.existsSync(fileB) || this.fileChange(fileA, fileB, ignoreDate))
                onNewA(fileA.substring(aHeader));
        });
        const bHeader = rootB.length + 1;
        fileB.forEach(file => {
            const fileA = pathA + this.separator + file;
            const fileB = pathB + this.separator + file;
            if (!fs.existsSync(fileA) || this.fileChange(fileB, fileA, ignoreDate))
                onNewB(fileB.substring(bHeader));
        });

        // recur to inner files
        [...dirA, ...newDirA].forEach(dir => this.scanDirRec(rootA, rootB, pathA, pathB, onNewA, onNewB, dir, ignoreDate));
    }

    // set ignore list for travelling and scanning
    setIgnoreList = list => this.ignoreList = list;

    // recursive travel file directory
    travel = (root, onDir, onFile, printing) => this.travelRec(root, root, onDir, onFile, printing);

    travelRec = (root, dir, onDir, onFile, printing) =>
        fs.readdirSync(dir)
            .filter(elem => this.filterIgnored(root, elem))
            .forEach(elem => {
                const path = dir + this.separator + elem;
                try {
                    if (fs.statSync(path).isDirectory()) {
                        onDir(path);
                        this.travelRec(root, path, onDir, onFile, printing);
                    }
                    else
                        onFile(path);
                }
                catch (e) { }
            });
}