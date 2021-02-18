import { w3cwebsocket as W3CWebSocket } from "websocket";

import FileSystem from '../utils/FileSystem';

const FS = new FileSystem();

export const makeClient = address => {
    const clt = new W3CWebSocket(`ws://${address}:42071`);
    clt.onopen = () => FS.setDebug(false);

    clt.onmessage = message => {
        const cmd = message.data.slice(0, 3);
        const payload = message.data.substring(3);
        switch (cmd) {
            case 'tvl':
                const dirs = [];
                const files = [];
                FS.travel(payload, path => dirs.push(path), files => files.push(files), true);
                clt.send('cfs' + JSON.stringify({ dirs, files }));
                break;
        }
    }
    return clt;
}