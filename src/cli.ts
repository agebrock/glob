import { program } from 'commander';
import {glob , Options, processOptions} from './main.js';


program
    .option('-a, --absolute', 'Return absolute paths for entries')
    .option('-b, --baseNameMatch', 'Match the base name of the path')
    .option('-c, --caseSensitiveMatch', 'Perform a case-sensitive match')
    .option('-C, --concurrency <number>', 'Set the maximum number of concurrent requests')
    .option('-f, --followSymbolicLinks', 'Follow symbolic links')
    .option('-i, --ignore <pattern>', 'Add a pattern to exclude')
    .option('-m, --markDirectories', 'Append / to directories')
    .option('-o, --objectMode', 'Return objects instead of strings')
    .option('-D, --onlyDirectories', 'Return only directories')
    .option('-F, --onlyFiles', 'Return only files')
    .option('-B, --uniqueBaseName', 'Return only unique filenames even if they are in different directories')
    .option('-S, --stats', 'Return stats for entries')
    .option('-s, --suppressErrors', 'Suppress errors')
    .option('-t, --throwErrorOnBrokenSymbolicLink', 'Throw an error on broken symbolic links')
    .option('-u, --unique', 'Ensure that the returned entries are unique')
    .option('--cwd <path>', 'The current working directory for the glob')
    .option('--dot', 'Include entries that begin with a .')
    .option('-O --outputCollection <outputCollection>', 'Output the collection to a file')
    .parse();

program.parse();
const options = processOptions(program.opts() as Options);

glob(program.args[0], options).on('data', (data) => {
    if(!options.stats){
        data = data.toString();
    }
    console.log(data);
});

