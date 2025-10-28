# TASK 1
Write-Host "=== TASK 1: Listar todos os livros ===" -ForegroundColor Green
$response = Invoke-RestMethod -Uri "http://localhost:5000/" -Method GET
$response | ConvertTo-Json -Depth 3 | Write-Host

# TASK 2
Write-Host "`n=== TASK 2: Obter livro por ISBN (1) ===" -ForegroundColor Green
$response = Invoke-RestMethod -Uri "http://localhost:5000/isbn/1" -Method GET
$response | ConvertTo-Json -Depth 3 | Write-Host

# TASK 3
Write-Host "`n=== TASK 3: Obter livros por autor (Jane Austen) ===" -ForegroundColor Green
$response = Invoke-RestMethod -Uri "http://localhost:5000/author/Jane%20Austen" -Method GET
$response | ConvertTo-Json -Depth 3 | Write-Host

# TASK 4
Write-Host "`n=== TASK 4: Obter livros por título (Pride and Prejudice) ===" -ForegroundColor Green
$response = Invoke-RestMethod -Uri "http://localhost:5000/title/Pride%20and%20Prejudice" -Method GET
$response | ConvertTo-Json -Depth 3 | Write-Host

# TASK 5
Write-Host "`n=== TASK 5: Obter reviews do livro ISBN 1 ===" -ForegroundColor Green
$response = Invoke-RestMethod -Uri "http://localhost:5000/review/1" -Method GET
$response | ConvertTo-Json -Depth 3 | Write-Host

# TASK 6
Write-Host "`n=== TASK 6: Registrar novo usuário (john_doe) ===" -ForegroundColor Green
$body = @{username="john_doe"; password="password123"} | ConvertTo-Json
$response = Invoke-RestMethod -Uri "http://localhost:5000/register" -Method POST -Body $body -ContentType "application/json"
$response | ConvertTo-Json -Depth 3 | Write-Host

Write-Host "`n✅ Todos os testes concluídos com sucesso!" -ForegroundColor Green
