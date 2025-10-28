const http = require('http');

console.log('Testando conexão...');

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/',
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('RESPONSE:', data);
    process.exit(0);
  });
});

req.on('error', (error) => {
  console.error('ERROR:', error.message);
  console.error('Code:', error.code);
  process.exit(1);
});

req.end();
