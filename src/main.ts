import fg from 'fast-glob';
import path from 'path';
import { Transform } from 'node:stream';
import fs from 'fs';


interface Options extends fg.Options {
    uniqueBaseName?: boolean;
    collect?: boolean;
    outputCollection?: string;
}


function uniqueFilesFilter(options: Options):Transform {
    const uniqueFiles = new Set();
    return new Transform({
        objectMode: options.stats ? true : false,
        transform(chunk, _, callback):void {
            let filename;
            if (options.stats) {
                filename = chunk.path.toString();
            } else {
                filename = chunk.toString();
            }
            if (!uniqueFiles.has(path.basename(filename))) {
                uniqueFiles.add(path.basename(filename));
                this.push(chunk);
            }
            callback();
        }
    });
};

function collect(options: Options, files: unknown[]):Transform {
    return new Transform({
        objectMode: options.stats ? true : false,
        transform(chunk, _, callback):void {
            let filename;
            if (options.stats) {
                filename = chunk.path.toString();
            } else {
                filename = chunk.toString();
            }
            if(options.stats){
                files.push(chunk);
                this.push(chunk);
            }else{
                files.push(filename);
                this.push(filename);
            }
            callback();
        }
    });
};

const defaultOptions: Options = {  dot: true, onlyFiles: true, absolute: true, braceExpansion: true, extglob: true, followSymbolicLinks: true, unique: true, uniqueBaseName: false, collect: false, stats:false , ignore: ['**/System Volume Information/**']};


function processOptions(options: Options): Options {
    options = Object.assign(defaultOptions, options);

    if (options.onlyDirectories) {
        options.onlyFiles = false;
    }

    if (options.outputCollection) {
        options.collect = true;
    }

    if(options.objectMode){
        options.stats = true;
    }

    return options;
}

function glob(pattern, options: Options): NodeJS.ReadableStream {
    options = processOptions(options);

    if (options.outputCollection) {
        options.collect = true;
    }
    if(options.objectMode){
        options.stats = true;
    }


    pattern = pattern.replace(/\\/g, '/');
    const driveLetterMatch = pattern.match(/^([A-Z]):/i);
    // let cwd = process.cwd();
    if (driveLetterMatch && driveLetterMatch.length > 1) {
        // Return the drive letter
        // cwd = driveLetterMatch[1] + ':\\';
        pattern = pattern.replace(/^([A-Z]):/i, '');
    }


    let stream = fg.stream([pattern], options);
    stream.on('error', (err) => {
        console.error(err);
    });
    if (options.uniqueBaseName) {
        stream = stream.pipe(uniqueFilesFilter(options));
    }

    if (options.collect) {
        const files: unknown[] = [];
        stream = stream.pipe(collect(options, files));
        stream.on('close', () => {
            stream.emit('files', files);
        });
        if (options.outputCollection) {
            stream.on('files', () => {
                const outDir = path.dirname(options.outputCollection);
                fs.mkdirSync(outDir, { recursive: true });
                fs.writeFileSync(options.outputCollection, JSON.stringify(files));
            });
        }
    }


    return stream
}

export { glob, Options, processOptions };
