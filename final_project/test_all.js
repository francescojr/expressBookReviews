const https = require('https');
const http = require('http');

function makeRequest(options, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const protocol = options.port === 443 ? https : http;
    const req = protocol.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function runTests() {
  console.log("🚀 Iniciando testes...\n");
  
  try {
    // Task 1
    console.log("=== TASK 1: Listar todos os livros ===");
    let result = await makeRequest({ hostname: 'localhost', port: 5000, path: '/' });
    console.log(`Status: ${result.status}`);
    console.log(`Resposta:`, result.data);
    console.log();

    // Task 2
    console.log("=== TASK 2: Obter livro por ISBN (1) ===");
    result = await makeRequest({ hostname: 'localhost', port: 5000, path: '/isbn/1' });
    console.log(`Status: ${result.status}`);
    console.log(`Resposta:`, result.data);
    console.log();

    // Task 3
    console.log("=== TASK 3: Obter livros por autor (Jane Austen) ===");
    result = await makeRequest({ hostname: 'localhost', port: 5000, path: '/author/Jane%20Austen' });
    console.log(`Status: ${result.status}`);
    console.log(`Resposta:`, result.data);
    console.log();

    // Task 4
    console.log("=== TASK 4: Obter livros por título (Pride and Prejudice) ===");
    result = await makeRequest({ hostname: 'localhost', port: 5000, path: '/title/Pride%20and%20Prejudice' });
    console.log(`Status: ${result.status}`);
    console.log(`Resposta:`, result.data);
    console.log();

    // Task 5
    console.log("=== TASK 5: Obter reviews do livro ISBN 1 ===");
    result = await makeRequest({ hostname: 'localhost', port: 5000, path: '/review/1' });
    console.log(`Status: ${result.status}`);
    console.log(`Resposta:`, result.data);
    console.log();

    // Task 6 - Register user
    console.log("=== TASK 6: Registrar novo usuário (john_doe) ===");
    result = await makeRequest(
      { hostname: 'localhost', port: 5000, path: '/register', method: 'POST', headers: { 'Content-Type': 'application/json' } },
      'POST',
      { username: 'john_doe', password: 'password123' }
    );
    console.log(`Status: ${result.status}`);
    console.log(`Resposta:`, result.data);
    console.log();

    console.log("✅ Todos os testes concluídos com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro durante os testes:', error.message);
    process.exit(1);
  }
}

runTests();
