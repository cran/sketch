const path = require('path');

const make_dev_node = function(entryFile, outDir, mode = "production") {
    outFile = "node-" + path.basename(entryFile);
    return {
      target: 'node',
      entry: entryFile,
      output: {
        path: path.resolve(__dirname, "../" + outDir),
        filename: outFile,
        libraryTarget: "commonjs2"
      },
      mode: mode
    }
}

// const makeWebConfig = function(entryFile, outDir, mode = "production") {
//   outFile = "browser-base-" + path.basename(entryFile);
//   return {
//       target: 'web', 
//       entry: entryFile,
//       output: {
//           path: path.resolve(__dirname, "../" + outDir),
//           filename: outFile,
//           libraryExport: "default",
//           library: 'R'  // library export name at the browser
//       },
//       mode: mode
//   }
// }

module.exports = [
    // node.js
    // base
    make_dev_node("./src/core/base/distributions.js", "bin/modules"),
    make_dev_node("./src/core/base/funprog.js", "bin/modules"),
    make_dev_node("./src/core/base/group_generic.js", "bin/modules"),
    make_dev_node("./src/core/base/math_functions.js", "bin/modules"),
    make_dev_node("./src/core/base/sets.js", "bin/modules"),
    make_dev_node("./src/core/base/stats.js", "bin/modules"),
    // for completeness
    make_dev_node("./src/core/base/utils.js", "bin/modules"),
    
    // // Web browser
    // // base
    // makeWebConfig("./src/core/base/distributions.js", "bin/dist"),
    // makeWebConfig("./src/core/base/funprog.js", "bin/dist"),
    // makeWebConfig("./src/core/base/group_generic.js", "bin/dist"),
    // makeWebConfig("./src/core/base/math_functions.js", "bin/dist"),
    // makeWebConfig("./src/core/base/sets.js", "bin/dist"),
    // makeWebConfig("./src/core/base/stats.js", "bin/dist"),
    // // for completeness
    // makeWebConfig("./src/core/base/utils.js", "bin/dist"),
];  
