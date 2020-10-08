# test_distributions.sh
#!/bin/bash

yarn jest --config jest-modules.config.js ./tests/test-files/dist_unif.test.js &&
    yarn jest --config jest-modules.config.js ./tests/test-files/dist_pois.test.js &&
    yarn jest --config jest-modules.config.js ./tests/test-files/dist_binom.test.js &&
    yarn jest --config jest-modules.config.js ./tests/test-files/dist_geom.test.js &&
    yarn jest --config jest-modules.config.js ./tests/test-files/dist_exp.test.js &&
    yarn jest --config jest-modules.config.js ./tests/test-files/dist_chisq.test.js &&
    yarn jest --config jest-modules.config.js ./tests/test-files/dist_gamma.test.js &&
    yarn jest --config jest-modules.config.js ./tests/test-files/dist_norm.test.js &&
    yarn jest --config jest-modules.config.js ./tests/test-files/dist_lnorm.test.js