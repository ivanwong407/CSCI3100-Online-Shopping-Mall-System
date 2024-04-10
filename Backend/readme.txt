curl -X POST http://localhost:5000/api/users/login -H "Content-Type: application/json" -d "{\"username\":\"yourUsername\", \"password\":\"yourPassword\"}"
curl -X POST http://localhost:5000/api/users/register -H "Content-Type: application/json" -d "{\"username\":\"yourUsername\", \"password\":\"yourPassword\"}"

REST CILENT for fetch user self information
GET /api/users/me HTTP/1.1
Host: localhost:5000
Authorization: Bearer <token>