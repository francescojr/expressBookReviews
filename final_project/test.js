const http = require('http');

// Task 1: Get all books
console.log("\n=== TASK 1: Listar todos os livros ===");
http.get('http://localhost:5000/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(JSON.parse(data)));
}).on('error', (e) => console.error(`Erro Task 1: ${e.message}`));

// Task 2: Get book by ISBN
setTimeout(() => {
  console.log("\n=== TASK 2: Obter livro por ISBN (1) ===");
  http.get('http://localhost:5000/isbn/1', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log(JSON.parse(data)));
  }).on('error', (e) => console.error(`Erro Task 2: ${e.message}`));
}, 500);

// Task 3: Get books by author
setTimeout(() => {
  console.log("\n=== TASK 3: Obter livros por autor (Chinua Achebe) ===");
  http.get('http://localhost:5000/author/Chinua%20Achebe', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log(JSON.parse(data)));
  }).on('error', (e) => console.error(`Erro Task 3: ${e.message}`));
}, 1000);

// Task 4: Get books by title
setTimeout(() => {
  console.log("\n=== TASK 4: Obter livros por título (Things Fall Apart) ===");
  http.get('http://localhost:5000/title/Things%20Fall%20Apart', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log(JSON.parse(data)));
  }).on('error', (e) => console.error(`Erro Task 4: ${e.message}`));
}, 1500);

// Task 5: Get reviews
setTimeout(() => {
  console.log("\n=== TASK 5: Obter reviews do livro ISBN 1 ===");
  http.get('http://localhost:5000/review/1', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log(JSON.parse(data)));
  }).on('error', (e) => console.error(`Erro Task 5: ${e.message}`));
}, 2000);

// Task 6: Register user
setTimeout(() => {
  console.log("\n=== TASK 6: Registrar novo usuário ===");
  const postData = JSON.stringify({username: 'john_doe', password: 'password123'});
  
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/register',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };
  
  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log(JSON.parse(data)));
  });
  
  req.on('error', (e) => console.error(`Erro Task 6: ${e.message}`));
  req.write(postData);
  req.end();
}, 2500);

setTimeout(() => {
  console.log("\n✅ Todos os testes concluídos!");
  process.exit(0);
}, 3500);
