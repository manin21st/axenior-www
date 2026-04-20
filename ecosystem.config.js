module.exports = {
  apps: [
    {
      name: 'axenior-web',
      script: 'node_modules/.bin/next',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3002,
      },
    },
  ],
}
