const path = require('path');

const makeNodeConfig = function(entryFile, outDir, mode = "production", exportVar = undefined) {
    outFile = "node-" + path.basename(entryFile);
    return {
        target: 'node',
        entry: entryFile,
        output: {
            path: path.resolve(__dirname, outDir),
            filename: outFile,
            libraryTarget: "commonjs2",
            libraryExport: exportVar
        },
        mode: mode
    }
}

const makeWebConfig = function(entryFile, outDir, mode = "production") {
    outFile = "browser-" + path.basename(entryFile);
    return {
        target: 'web', 
        entry: entryFile,
        output: {
            path: path.resolve(__dirname, outDir),
            filename: outFile,
            libraryExport: "default",
            library: 'R'  // library export name at the browser
        },
        mode: mode
    }
}

module.exports = [    
    // R core = base + Data structure
    makeNodeConfig("./src/core/base.js", "bin/modules"),
    makeNodeConfig("./src/core/R_array.js", "bin/modules"),
    makeNodeConfig("./src/core/R_list.js", "bin/modules"),
    makeNodeConfig("./src/core/R_dataframe.js", "bin/modules"),
    // Top level
    makeNodeConfig("./src/R_core.js", "bin/dist", "production", "default"),
    makeWebConfig("./src/R_core.js", "bin/dist", "production")
];  
