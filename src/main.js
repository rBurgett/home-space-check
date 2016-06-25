import origFS from 'fs';
import promisify from 'promisify-node';
import co from 'co';
import path from 'path';
import now from 'performance-now';

const largeSize = 500000000;

const fs = promisify(origFS);

const home = process.env.HOME;

const checkFolder = p => new Promise(resolve => {
    co(function* () {
        const items = yield fs.readdir(p);
        let largeFiles = [];
        for(const f of items) {
            const filePath = path.join(p, f);
            try {
                const stats = yield fs.stat(filePath);
                if(stats.isDirectory()) {
                    largeFiles = largeFiles.concat(yield checkFolder(filePath));
                } else if(stats.isFile()) {
                    if(stats.size >= largeSize) {
                        largeFiles = largeFiles.concat([filePath]);
                    }
                }
            } catch(err) {
                // do nothing with error, just let the process continue
            }
        }
        resolve(largeFiles);
    });
});

co(function* () {

    const begin = now();

    try {
        const items = yield fs.readdir(home);
        let folders = [];
        for(const f of items) {
            const itemPath = path.join(home, f);
            const stats = yield fs.stat(itemPath);
            if(stats.isDirectory()) folders.push(itemPath);
        }

        const folderPromises = folders.map(f => new Promise((resolve, reject) => {
            checkFolder(f)
                .then(files => resolve(files))
                .catch(err => reject(err));
        }));

        const results = yield Promise.all(folderPromises);
        const largeFiles = results
            .reduce((arr, files) => {
                return arr.concat(files);
            }, [])
            .sort((a, b) => a.localeCompare(b));

        try {
            origFS.writeFileSync('large-files.txt', largeFiles.join('\n'), 'utf8');
        } catch(err) {
            console.error(err);
        }

        const end = now();

        console.log(`${largeFiles.length} files found in ${((end - begin) / 1000).toFixed()} seconds.\nFile list saved to large-files.txt.`);

    } catch(err) {
        console.error(err);
    }

});
