const fs = window.require('fs');

export default class FileSystem {

    constructor() {
        this.ignoreList = [];
        this.debug = false;
    }

    getCurDir = dir => fs.readdirSync(dir).filter(elem => fs.statSync(dir + '/' + elem).isDirectory());

    setDebug = val => this.debug = val;

    setIgnoreList = list => this.ignoreList = list;

    travel = (root, onDir, onFile, printing) => {
        if (printing)
            console.log('[ROOT] |' + root.substring(root.lastIndexOf('/') + 1));
        this.travelRec(root, root, onDir, onFile, printing);
    }

    travelRec = (root, dir, onDir, onFile, printing) => {
        const content = fs.readdirSync(dir);

        let builder = '';
        if (printing)
            for (let i = 0; i < dir.split('/').length - root.split('/').length + 1; ++i)
                builder += '--';

        content
            .filter(elem => {
                for (let i = 0; i < this.ignoreList.length; ++i)
                    if (this.ignoreList[i] === '/' + elem || this.ignoreList[i] === root + '/' + elem)
                        return false;
                return true;
            })
            .forEach(elem => {
                const path = dir + '/' + elem;
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