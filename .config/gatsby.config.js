module.exports = {
  // Set to true for optimizing multiple builds
  saveQueries: true,
  // Use file system cache instead of lmdb
  backendType: 'fs',
  // Disable extraneous features that might cause problems
  persistMode: 'memory',
  // Ensure we respect memory limits
  memoryLimit: 500, // MB
}; 