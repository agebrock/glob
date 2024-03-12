# _glob

**A Versatile CLI Tool for Efficient File Globbing**

Globbing made easy! _glob is a command-line interface (CLI) tool designed to swiftly search and manipulate files based on patterns. Whether you're hunting for specific files, directories, or both, _glob has got you covered with its extensive feature set and intuitive usage.

## Usage

```bash
_glob [options] <pattern>
```

## Options

- `-a, --absolute`: Return absolute paths for entries
- `-b, --baseNameMatch`: Match the base name of the path
- `-c, --caseSensitiveMatch`: Perform a case-sensitive match
- `-C, --concurrency <number>`: Set the maximum number of concurrent requests
- `-f, --followSymbolicLinks`: Follow symbolic links
- `-i, --ignore <pattern>`: Add a pattern to exclude
- `-m, --markDirectories`: Append / to directories
- `-o, --objectMode`: Return objects instead of strings
- `-D, --onlyDirectories`: Return only directories
- `-F, --onlyFiles`: Return only files
- `-B, --uniqueBaseName`: Return only unique filenames even if they are in different directories
- `-S, --stats`: Return stats for entries
- `-s, --suppressErrors`: Suppress errors
- `-t, --throwErrorOnBrokenSymbolicLink`: Throw an error on broken symbolic links
- `-u, --unique`: Ensure that the returned entries are unique
- `--cwd <path>`: The current working directory for the glob
- `--dot`: Include entries that begin with a .
- `-O --outputCollection <outputCollection>`: Output the collection to a file
- `-h, --help`: Display help for command

## Example Usage as Library

```javascript
// Use with relative paths
const stream = _glob('../!(node_modules)**/!(*.d)*.ts', { outputCollection: "./files.json" });

// Use with Windows drives or Linux
// The following example will search for all .ts files in the C:/Users directory, excluding the node_modules directory and excluding .d.ts files
const stream = _glob('C:/Users/!(node_modules)**/!(*.d)*.ts', { outputCollection: "./files.json" });

stream.pipe(process.stdout);

stream.on('data', (chunk) => {
    console.log(chunk.toString());
});

// This will be triggered when the stream is done and collect equals to true or outputCollection is set
stream.on('files', (files) => {
    console.log(files);
});
```

## PowerShell Autocomplete

For easy usage with PowerShell autocomplete, _glob normalizes Windows paths. Here's an example:

```powershell
# Use with PowerShell
_glob D:\agebrock\**\* 
```

## Example Usage in PowerShell

```powershell
# Glob all JSON files and read their contents
_glob '**/*.json' | ForEach-Object { Get-Content $_ }
```

## Installation

Install _glob globally to access it from anywhere:

```bash
npm install -g @agebrock/glob
```

## Contribution

Contributions are welcome! Feel free to open issues or pull requests on [GitHub](https://github.com/agebrock/glob).

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/yourusername/_glob/blob/main/LICENSE) file for details.

---

Get globbing with _glob and experience the power of effortless file searching and manipulation. Happy coding! 🚀


## Available Scripts

- `clean` - remove coverage data, Jest cache and transpiled files,
- `prebuild` - lint source files and tests before building,
- `build` - transpile TypeScript to ES6,
- `build:watch` - interactive watch mode to automatically transpile source files,
- `lint` - lint source files and tests,
- `prettier` - reformat files,
- `test` - run tests,
- `test:watch` - interactive watch mode to automatically re-run tests

