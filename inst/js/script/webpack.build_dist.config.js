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

module.exports = [
    // distributions
    make_dev_node("./src/core/base/distributions/dist.js", "bin/modules"),
    make_dev_node("./src/core/base/distributions/dist_binom.js", "bin/modules"),
    make_dev_node("./src/core/base/distributions/dist_chisq.js", "bin/modules"),
    make_dev_node("./src/core/base/distributions/dist_exp.js", "bin/modules"),
    make_dev_node("./src/core/base/distributions/dist_gamma.js", "bin/modules"),
    make_dev_node("./src/core/base/distributions/dist_geom.js", "bin/modules"),
    make_dev_node("./src/core/base/distributions/dist_lnorm.js", "bin/modules"),
    make_dev_node("./src/core/base/distributions/dist_norm.js", "bin/modules"),
    make_dev_node("./src/core/base/distributions/dist_pois.js", "bin/modules"),
    make_dev_node("./src/core/base/distributions/dist_unif.js", "bin/modules"),
];  
