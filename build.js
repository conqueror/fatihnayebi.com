#!/usr/bin/env node

process.env.GATSBY_TELEMETRY_DISABLED = '1';
process.env.GATSBY_EXPERIMENTAL_LMDB_STORE = '0';
process.env.GATSBY_CACHE_BACKEND = 'fs';
process.env.NODE_OPTIONS = '--max-old-space-size=4096';
process.env.LMDB_FORCE_NO_READAHEAD = '1';
process.env.GATSBY_EXPERIMENTAL_FORCE_CACHE_FS = '1';

// Execute gatsby build
const { spawnSync } = require('child_process');
console.log('🚀 Starting custom Gatsby build...');

try {
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
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} 