# test_base.sh
#!/bin/bash

yarn jest --config ./script/jest-modules.config.js ./tests/test-files/utils.test.js && \
    yarn jest --config ./script/jest-modules.config.js ./tests/test-files/sets.test.js && \
    yarn jest --config ./script/jest-modules.config.js ./tests/test-files/stats.test.js && \
    yarn jest --config ./script/jest-modules.config.js ./tests/test-files/funprog.test.js && \
    yarn jest --config ./script/jest-modules.config.js ./tests/test-files/math_functions.test.js && \
    yarn jest --config ./script/jest-modules.config.js ./tests/test-files/group_generic.test.js
    