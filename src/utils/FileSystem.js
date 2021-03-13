const fs = window.require('fs');

export default class FileSystem {

    constructor() {
        this.ignoreList = [];
        this.debug = false;

        this.os = window.navigator.platform.substring(0, 3).toLowerCase();
        this.separator = this.os === 'win' ? '\\' : '/';
    }

    getCurDir = dir => fs.readdirSync(dir).filter(elem => fs.statSync(dir + this.separator + elem).isDirectory());

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

    setDebug = val => this.debug = val;

    setIgnoreList = list => this.ignoreList = list;

    travel = (root, onDir, onFile, printing) => {
        if (printing)
            console.log('[ROOT] |' + root.substring(root.lastIndexOf(this.separator) + 1));
        this.travelRec(root, root, onDir, onFile, printing);
    }

    travelRec = (root, dir, onDir, onFile, printing) => {
        const content = fs.readdirSync(dir);

        let builder = '';
        if (printing)
            for (let i = 0; i < dir.split(this.separator).length - root.split(this.separator).length + 1; ++i)
                builder += '--';

        content
            .filter(elem => {
                for (let i = 0; i < this.ignoreList.length; ++i)
                    if (this.ignoreList[i] === this.separator + elem || this.ignoreList[i] === root + this.separator + elem)
                        return false;
                return true;
            })
            .forEach(elem => {
                const path = dir + this.separator + elem;
                try {
                    if (fs.statSync(path).isDirectory()) {
                        if (printing)
                            console.log('[DIR]  |' + builder + elem);
                        if (onDir)
                            onDir(path);
                        this.travelRec(root, path, onDir, onFile, printing);
                    }
                    else {
                        if (printing)
                            console.log('[FILE] |' + builder + elem);
                        if (onFile)
                            onFile(path);
                    }
                }
                catch (e) {

                }
            });
    }
}