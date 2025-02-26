#!/usr/bin/env node

process.env.GATSBY_TELEMETRY_DISABLED = '1';
process.env.GATSBY_EXPERIMENTAL_LMDB_STORE = '0';
process.env.GATSBY_CACHE_BACKEND = 'fs';
process.env.NODE_OPTIONS = '--max-old-space-size=4096';

// Execute gatsby build
const { spawnSync } = require('child_process');
console.log('🚀 Starting custom Gatsby build...');

// Run gatsby build with our configuration
const result = spawnSync('node', [
  './node_modules/.bin/gatsby',
  'build',
  '--no-uglify',
  '--verbose'
], {
  stdio: 'inherit',
  env: {
    ...process.env,
  }
});

process.exit(result.status); 