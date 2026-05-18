# HunarHub API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Getting a Token

1. Register a new user:
```bash
POST /auth/register
```

2. Login:
```bash
POST /auth/login
```

The response will include a `token` that you use for authenticated requests.

---

## API Endpoints

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"  // or "entrepreneur"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "userId": "507f1f77bcf86cd799439011"
}
```

**Error Responses:**
- 400: User already exists, or missing required fields
- 500: Server error

---

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Responses:**
- 400: Missing email or password
- 401: Invalid credentials
- 500: Server error

---

### User Endpoints

#### Get User Profile
```http
GET /users/profile
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-9999999999",
  "location": "Mumbai, Maharashtra",
  "role": "user",
  "address": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001"
  },
  "createdAt": "2024-05-18T10:30:00Z"
}
```

**Error Responses:**
- 401: Not authorized (token missing/invalid)
- 404: User not found
- 500: Server error

---

#### Update User Profile
```http
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "phone": "+91-8888888888",
  "location": "Delhi",
  "address": {
    "street": "456 Oak Ave",
    "city": "Delhi",
    "state": "Delhi",
    "zipCode": "110001"
  }
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Jane Doe",
  "email": "john@example.com",
  "phone": "+91-8888888888",
  "location": "Delhi",
  "updatedAt": "2024-05-18T11:00:00Z"
}
```

---

#### Get All Entrepreneurs
```http
GET /users/entrepreneurs
Query Parameters:
  - category: cobbler|potter|tailor|artisan|vendor (optional)
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Ramesh Kumar",
    "email": "ramesh@example.com",
    "role": "entrepreneur",
    "location": "Bangalore",
    "entrepreneurProfile": {
      "businessName": "Ramesh's Cobbler Shop",
      "category": "cobbler",
      "bio": "Expert cobbler with 15 years experience",
      "skills": ["Shoe Repair", "Shoe Crafting", "Leather Work"],
      "experience": "15 years",
      "averageRating": 4.8,
      "totalReviews": 45,
      "earnings": 50000,
      "isVerified": true
    }
  }
]
```

---

#### Search Entrepreneurs
```http
GET /users/entrepreneurs/search
Query Parameters:
  - searchTerm: string (optional)
  - category: cobbler|potter|tailor|artisan|vendor (optional)
  - minRating: number (optional)
```

**Example:**
```http
GET /users/entrepreneurs/search?searchTerm=cobbler&minRating=4
```

---

#### Get Entrepreneur Profile
```http
GET /users/entrepreneurs/:id
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Ramesh Kumar",
  "email": "ramesh@example.com",
  "phone": "+91-9876543210",
  "location": "Bangalore",
  "role": "entrepreneur",
  "entrepreneurProfile": {
    "businessName": "Ramesh's Cobbler Shop",
    "category": "cobbler",
    "bio": "Expert cobbler with 15 years experience",
    "skills": ["Shoe Repair", "Shoe Crafting"],
    "experience": "15 years",
    "averageRating": 4.8,
    "totalReviews": 45,
    "earnings": 50000,
    "isVerified": true
  }
}
```

---

#### Become an Entrepreneur
```http
PUT /users/become-entrepreneur
Authorization: Bearer <token>
Content-Type: application/json

{
  "businessName": "My Shop",
  "category": "artisan",
  "bio": "Handmade products specialist",
  "skills": ["Woodwork", "Painting"],
  "experience": "5 years",
  "profileImage": "https://example.com/image.jpg"
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "role": "entrepreneur",
  "entrepreneurProfile": {
    "businessName": "My Shop",
    "category": "artisan",
    "bio": "Handmade products specialist",
    "skills": ["Woodwork", "Painting"],
    "experience": "5 years",
    "isVerified": false,
    "averageRating": 0,
    "totalReviews": 0
  }
}
```

---

### Product Endpoints

#### Get All Products
```http
GET /products
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439020",
    "name": "Handmade Leather Shoes",
    "description": "Beautiful handcrafted leather shoes",
    "entrepreneur": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Ramesh Kumar"
    },
    "category": "cobbler",
    "price": 2500,
    "discountPrice": 2000,
    "stock": 10,
    "images": ["https://example.com/shoe1.jpg"],
    "averageRating": 4.5,
    "totalReviews": 12,
    "isActive": true,
    "createdAt": "2024-05-18T10:00:00Z"
  }
]
```

---

#### Search Products
```http
GET /products/search
Query Parameters:
  - category: cobbler|potter|tailor|artisan|vendor (optional)
  - minPrice: number (optional)
  - maxPrice: number (optional)
  - searchTerm: string (optional)
```

**Example:**
```http
GET /products/search?category=cobbler&minPrice=1000&maxPrice=5000
```

---

#### Get Product by ID
```http
GET /products/:id
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439020",
  "name": "Handmade Leather Shoes",
  "description": "Beautiful handcrafted leather shoes",
  "entrepreneur": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Ramesh Kumar",
    "entrepreneurProfile": {
      "businessName": "Ramesh's Cobbler Shop"
    }
  },
  "category": "cobbler",
  "price": 2500,
  "stock": 10,
  "images": ["https://example.com/shoe1.jpg"],
  "averageRating": 4.5,
  "totalReviews": 12,
  "createdAt": "2024-05-18T10:00:00Z"
}
```

---

#### Create Product
```http
POST /products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Handmade Leather Shoes",
  "description": "Beautiful handcrafted leather shoes",
  "category": "cobbler",
  "price": 2500,
  "discountPrice": 2000,
  "stock": 10,
  "images": ["https://example.com/shoe1.jpg"]
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439020",
  "name": "Handmade Leather Shoes",
  "entrepreneur": "507f1f77bcf86cd799439011",
  "category": "cobbler",
  "price": 2500,
  "stock": 10,
  "createdAt": "2024-05-18T10:00:00Z"
}
```

**Error Responses:**
- 400: Missing name or price
- 401: Not authorized
- 500: Server error

---

#### Update Product
```http
PUT /products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "price": 3000,
  "stock": 15,
  "description": "Updated description"
}
```

**Error Responses:**
- 403: Not authorized (not your product)
- 404: Product not found
- 500: Server error

---

#### Delete Product
```http
DELETE /products/:id
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "message": "Product deleted"
}
```

---

### Order Endpoints

#### Create Order
```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "product": "507f1f77bcf86cd799439020",
      "quantity": 2,
      "price": 2500
    }
  ],
  "totalAmount": 5000,
  "deliveryAddress": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001",
    "phone": "+91-9999999999"
  },
  "paymentMethod": "cod",
  "notes": "Please deliver in the morning"
}
```

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439030",
  "customer": "507f1f77bcf86cd799439011",
  "entrepreneur": "507f1f77bcf86cd799439012",
  "items": [...],
  "totalAmount": 5000,
  "status": "pending",
  "isPaid": false,
  "createdAt": "2024-05-18T10:00:00Z"
}
```

---

#### Get Customer Orders
```http
GET /orders
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439030",
    "totalAmount": 5000,
    "status": "pending",
    "createdAt": "2024-05-18T10:00:00Z",
    "entrepreneur": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Ramesh Kumar"
    }
  }
]
```

---

#### Get Entrepreneur Orders
```http
GET /orders/entrepreneur/orders
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439030",
    "customer": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "totalAmount": 5000,
    "status": "pending",
    "deliveryAddress": {...}
  }
]
```

---

#### Get Order by ID
```http
GET /orders/:id
Authorization: Bearer <token>
```

---

#### Update Order Status
```http
PUT /orders/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "confirmed"
}
```

**Valid Statuses:** pending, confirmed, shipped, delivered, cancelled

---

#### Cancel Order
```http
PUT /orders/:id/cancel
Authorization: Bearer <token>
```

**Conditions:**
- Only pending orders can be cancelled
- Stock is refunded
- Response includes updated order

---

#### Get Order Analytics
```http
GET /orders/entrepreneur/analytics
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "totalOrders": 45,
  "totalRevenue": 125000,
  "paidOrders": 40,
  "pendingOrders": 3,
  "completedOrders": 42
}
```

---

### Service Endpoints

#### Get All Services
```http
GET /services
```

**Response:** Array of services similar to products

---

#### Search Services
```http
GET /services/search
Query Parameters:
  - category: string
  - minPrice: number
  - maxPrice: number
  - searchTerm: string
```

---

#### Create Service
```http
POST /services
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Shoe Repair",
  "description": "Professional shoe repair service",
  "category": "cobbler",
  "basePrice": 500,
  "availability": {
    "monday": { "available": true, "startTime": "09:00", "endTime": "18:00" },
    "tuesday": { "available": true, "startTime": "09:00", "endTime": "18:00" }
  }
}
```

---

#### Create Service Request
```http
POST /services/request/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "entrepreneur": "507f1f77bcf86cd799439012",
  "service": "507f1f77bcf86cd799439040",
  "title": "Repair my shoes",
  "description": "Need to repair my shoes",
  "requestedDate": "2024-05-25",
  "serviceLocation": {
    "street": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "zipCode": "400001"
  },
  "phone": "+91-9999999999"
}
```

---

#### Get Service Requests (Entrepreneur)
```http
GET /services/requests/entrepreneur
Authorization: Bearer <token>
```

---

#### Update Service Request Status
```http
PUT /services/requests/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "accepted",
  "finalPrice": 600,
  "entrepreneurNotes": "I'll complete it by tomorrow"
}
```

**Valid Statuses:** pending, accepted, rejected, in-progress, completed, cancelled

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing/invalid token |
| 403 | Forbidden - No permission |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Internal error |

---

## Error Response Format

All error responses follow this format:

```json
{
  "message": "Error description",
  "error": {
    // Additional error details (only in development)
  }
}
```

---

## Pagination

Some endpoints may support pagination:

```http
GET /products?page=1&limit=10
```

---

## Rate Limiting

Future implementation will add rate limiting to prevent abuse:
- 100 requests per 15 minutes per IP
- 1000 requests per day per user

---

## Versioning

API versioning will be implemented as:
```
/api/v1/users
/api/v2/users
```

---

## Testing the API

### Using Postman

1. Install Postman
2. Create a new workspace
3. Create requests for each endpoint
4. Use environment variables for base URL and token
5. Test different scenarios

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"pass123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"pass123"}'

# Get profile (replace TOKEN with actual token)
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer TOKEN"
```

---

## Best Practices

1. **Always validate input** on frontend before sending
2. **Store token securely** in localStorage or httpOnly cookie
3. **Handle errors gracefully** with user-friendly messages
4. **Use appropriate HTTP methods** (GET, POST, PUT, DELETE)
5. **Include CORS headers** when needed
6. **Monitor API rate limits**
7. **Keep sensitive data** out of logs
8. **Use HTTPS** in production

---

## Support

For API issues or questions:
- Check this documentation
- Review error messages
- Check browser console
- Check backend logs
- Create an issue on GitHub

---

**API Documentation - v1.0**
Last Updated: May 18, 2024
