import { merge } from 'webpack-merge';

import common from './webpack.common.js';
import { src } from './paths';

// Merge webpack configuration files
const config = merge(common, {
  entry: {
    popup: src + '/popup.js',
    contentScript: src + '/content.js',
    background: src + '/background.js',
  },
});

export default config;
