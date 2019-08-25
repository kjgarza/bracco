const FastBootAppServer = require('fastboot-app-server');
 
let server = new FastBootAppServer({
  distPath: 'dist',
  gzip: true,
  host: '0.0.0.0',
  port: 80,
  sandboxGlobals: { PASSENGER_APP_ENV: process.env.PASSENGER_APP_ENV },
  chunkedResponse: true
});
 
server.start();