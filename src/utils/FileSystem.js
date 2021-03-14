const fs = window.require('fs');

export default class FileSystem {

    constructor() {
        this.ignoreList = [];
    
        this.os = window.navigator.platform.substring(0, 3).toLowerCase();
        this.separator = this.os === 'win' ? '\\' : '/';
    }

    // copy files
    copy = (from, to, path) => fs.copyFileSync(from + this.separator + path, to + this.separator + path);

    // filter ignored files and directories
    filterIgnored = (root, elem) =>
        this.ignoreList.forEach(ignore => {
            if (ignore === this.separator + elem || ignore === root + this.separator + elem)
                return false;
            return true;
        });

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
        return fs.readdirSync(prefix);
    }

    // mirror directory structure + mark changed files
    scanDir = (rootA, rootB, onNewA, onNewB) => this.scanDirRec(rootA, rootB, rootA, rootB, onNewA, onNewB, '');

    scanDirRec = (rootA, rootB, pathA, pathB, onNewA, onNewB, dir) => {
        pathA += (dir ? this.separator + dir : '');
        pathB += (dir ? this.separator + dir : '');

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
        const aHeader = rootA.length;
        fileA.forEach(file => {
            const fileA = pathA + this.separator + file;
            const fileB = pathB + this.separator + file;
            if (!fs.existsSync(fileB) || fs.statSync(fileA).mtime > fs.statSync(fileB).mtime)
                onNewA(fileA.substring(aHeader));
        });
        const bHeader = rootB.length;
        fileB.forEach(file => {
            const fileA = pathA + this.separator + file;
            const fileB = pathB + this.separator + file;
            if (!fs.existsSync(fileA) || fs.statSync(fileB).mtime > fs.statSync(fileA).mtime)
                onNewB(fileB.substring(bHeader));
        });

        // recur to inner files
        [...dirA, ...newDirA].forEach(dir => this.scanDirRec(rootA, rootB, pathA, pathB, onNewA, onNewB, dir));
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