'use strict';

import { merge } from 'webpack-merge';

import common from './webpack.common.js';
import PATHS from './paths.js';

// Merge webpack configuration files
const config = merge(common, {
  entry: {
    popup: PATHS.src + '/popup.js',
    content: PATHS.src + '/content.js',
    background: PATHS.src + '/background.js',
  },
});

export default config;
