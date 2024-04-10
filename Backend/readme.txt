curl -X POST http://localhost:5000/api/users/login -H "Content-Type: application/json" -d "{\"username\":\"yourUsername\", \"password\":\"yourPassword\"}"
curl -X POST http://localhost:5000/api/users/register -H "Content-Type: application/json" -d "{\"username\":\"yourUsername\", \"password\":\"yourPassword\"}"

REST CILENT for fetch user self information
GET /api/users/me HTTP/1.1
Host: localhost:5000
Authorization: Bearer <token>


POST /api/products/postProduct HTTP/1.1
Host: localhost:5000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTY3ODNjZDMxNjA3MTAzNjIwNGEzNSIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTcxMjc2MjU1MiwiZXhwIjoxNzEyNzY2MTUyfQ.vZOezo0PvDevOAVZEHI6DPz1vA9qWDX5SoYgd1H2adY
Content-Type: application/json

{
  "name": "Sample Product2",
  "price": 99.99,
  "category": "Electronics",
  "description": "This is a sample description of the product.",
  "stock": 10
}


GET /api/products/6616aed2ba970ff5bd8b4adf HTTP/1.1
Host: localhost:5000

//get all product
curl -X GET http://localhost:5000/api/products/

//get all user for admin

curl -X POST http://localhost:5000/api/users/login -H "Content-Type: application/json" -d "{\"username\":\"admin\", \"password\":\"admin\"}"
curl -X GET http://localhost:5000/api/users -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MTZjZDY2YTIwYjAwMGYxMWQ4OTMyZiIsInVzZXJUeXBlIjoiYWRtaW4iLCJpYXQiOjE3MTI3NzE1MjksImV4cCI6MTcxMjc3NTEyOX0.5HsnIIrESy70cnzC_7sD33PeG-I-Ih2N-rutAAYR3p4"


