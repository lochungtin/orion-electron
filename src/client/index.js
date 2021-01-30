import { w3cwebsocket as W3CWebSocket } from "websocket";

import FileSystem from '../Utils/FileSystem';

import { setClient } from '../redux/action';
import { store } from '../redux/store';

const FS = new FileSystem();

export const makeClient = (port, onOpen) => {
    const clt = new W3CWebSocket(`ws://${port}:8000`);
    clt.onopen = () => {
        FS.setDebug(false)
        onOpen();
    };

    clt.onerror = err => store.dispatch(setClient({}));

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