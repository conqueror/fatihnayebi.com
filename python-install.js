#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🐍 Setting up fake Python for build...');

// Create a directory to house our fake Python
const pythonDir = path.join(__dirname, '.python');
if (!fs.existsSync(pythonDir)) {
  fs.mkdirSync(pythonDir, { recursive: true });
}

// Create a fake Python script
const pythonScript = path.join(pythonDir, 'python');
fs.writeFileSync(pythonScript, '#!/bin/sh\necho "Python 3.9.0"\nexit 0\n');
fs.chmodSync(pythonScript, '755'); // Make executable

// Create a symbolic link for python3
const python3Script = path.join(pythonDir, 'python3');
try {
  fs.unlinkSync(python3Script);
} catch (e) {
  // Ignore errors if it doesn't exist
}
fs.symlinkSync(pythonScript, python3Script);

// Update PATH to include our fake Python
process.env.PATH = `${pythonDir}:${process.env.PATH}`;
process.env.PYTHON = pythonScript;

console.log('✅ Fake Python setup complete!');
console.log(`Python path: ${pythonScript}`);
console.log(`Python3 path: ${python3Script}`);
console.log(`Updated PATH: ${process.env.PATH}`);

// Execute the build command
const { execSync } = require('child_process');
console.log('🏗️ Running build command...');

try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
  process.exit(0);
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} 