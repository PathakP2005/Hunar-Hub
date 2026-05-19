# HunarHub - Digital Marketplace for Local Micro-Entrepreneurs

[![Marketplace](https://img.shields.io/badge/Marketplace-Local%20Commerce-blue?style=flat-square)](https://github.com)
[![Full-stack](https://img.shields.io/badge/Full-stack-Modern%20Architecture-green?style=flat-square)](https://github.com)
[![SaaS](https://img.shields.io/badge/SaaS-Platform-purple?style=flat-square)](https://github.com)
[![Secure](https://img.shields.io/badge/Secure-JWT%20Auth-red?style=flat-square)](https://github.com)
[![Responsive](https://img.shields.io/badge/Responsive-Mobile%20Friendly-yellow?style=flat-square)](https://github.com)

## Project Overview

HunarHub is a comprehensive web-based digital marketplace designed to empower local micro-entrepreneurs (cobblers, potters, tailors, artisans, and small vendors) by providing them with digital visibility and access to customers. The platform enables entrepreneurs to showcase their skills, sell handmade products, and accept service requests while customers can easily discover and support local talent.

## Design & Skills Tags

`Design Systems` `UI/UX` `Visual Design` `Branding` `Interaction Design` `User Research` `Conversion Design` `Product Design` `Creative Strategy` `Digital Marketing` `E-commerce` `Marketplace Development` `Service Booking` `User Experience` `Micro-entrepreneur Support` `Product Discovery` `Client-Server Architecture` `Full-stack Development` `API Design` `Performance Optimization` `Security` `Responsive Design` `Mobile-first` `Accessibility` `Data-driven Interfaces` `DevOps` `Cloud Deployment` `Cross-platform`

## Key Features

## Key Features

### For Customers
- 🔍 Browse and search local entrepreneurs by category, location, and skill type
- 🛍️ View entrepreneur profiles and product galleries
- 📦 Purchase handmade products with secure ordering
- 🔧 Request services from skilled entrepreneurs
- ⭐ Leave ratings and reviews
- 📊 Track order and service request history

### For Entrepreneurs
- 👤 Create and manage professional profiles
- 🏪 List products with images and pricing
- 🔧 Offer services and manage availability
- 📋 Accept or reject service requests
- 📊 View earnings and business analytics
- ⭐ Build reputation through customer reviews

### For Admins
- ✅ Approve and verify entrepreneur accounts
- 📋 Manage categories and skills
- 📊 Monitor platform analytics
- 🛡️ Handle disputes and complaints

## Technology Stack

### Skills & Technologies
`Node.js` `Express.js` `MongoDB` `Mongoose` `JWT` `bcryptjs` `React 19` `Vite` `Tailwind CSS` `Axios` `React Router v6` `Lucide React` `HTML5` `CSS3` `JavaScript (ES2024)` `REST API` `JSON` `CORS` `Git` `GitHub` `AWS` `Vercel` `Netlify` `Responsive UI` `Mobile-first` `Performance Optimization` `Authentication` `CRUD` `Data Modeling`

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **CORS**: Enabled for frontend communication

### Frontend
- **Library**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **Icons**: Lucide React

### Deployment
- Backend: AWS, Heroku, or DigitalOcean
- Frontend: Vercel, Netlify, or AWS S3 + CloudFront

## Project Structure

```
Hunar-Hub/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── userController.js     # User & Entrepreneur management
│   │   ├── productController.js  # Product CRUD & search
│   │   ├── serviceController.js  # Service & Service Request management
│   │   └── orderController.js    # Order management & analytics
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   └── errorMiddleware.js    # Error handling & validation
│   ├── models/
│   │   ├── User.js               # User schema with entrepreneur fields
│   │   ├── Product.js            # Product schema
│   │   ├── Service.js            # Service schema
│   │   ├── Order.js              # Order schema
│   │   ├── ServiceRequest.js     # Service request schema
│   │   └── Review.js             # Review & rating schema
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication (register, login)
│   │   ├── userRoutes.js         # User & entrepreneur routes
│   │   ├── productRoutes.js      # Product routes
│   │   ├── serviceRoutes.js      # Service routes
│   │   └── orderRoutes.js        # Order routes
│   ├── .env.example              # Environment variables template
│   ├── server.js                 # Express server setup
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation component
│   │   │   ├── ProductCard.jsx   # Product display card
│   │   │   └── EntrepreneurCard.jsx  # Entrepreneur profile card
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Landing page
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Register.jsx      # Registration page
│   │   │   ├── Entrepreneurs.jsx # Browse entrepreneurs
│   │   │   └── Dashboard.jsx     # User/Entrepreneur dashboard
│   │   ├── services/
│   │   │   └── api.js            # API client & endpoints
│   │   ├── App.jsx               # Main app component
│   │   ├── index.css             # Global styles (Tailwind)
│   │   └── main.jsx              # React entry point
│   ├── .env.example              # Environment variables template
│   ├── tailwind.config.js        # Tailwind configuration
│   ├── postcss.config.js         # PostCSS configuration
│   ├── vite.config.js            # Vite configuration
│   └── package.json
├── README.md                     # This file
├── SETUP.md                      # Detailed setup instructions
└── API_DOCUMENTATION.md          # API endpoints documentation
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas cloud)
- npm or yarn

### Backend Setup

See [SETUP.md](./SETUP.md) for detailed instructions.

Quick start:
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm start
```

### Frontend Setup

See [SETUP.md](./SETUP.md) for detailed instructions.

Quick start:
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## API Endpoints

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete API documentation.

### Quick Reference

**Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

**Users**
- `GET /api/users/profile` - Get user profile (authenticated)
- `PUT /api/users/profile` - Update profile (authenticated)
- `GET /api/users/entrepreneurs` - Get all entrepreneurs
- `GET /api/users/entrepreneurs/search` - Search entrepreneurs
- `PUT /api/users/become-entrepreneur` - Become entrepreneur (authenticated)

**Products**
- `GET /api/products` - Get all products
- `GET /api/products/search` - Search products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (authenticated)
- `PUT /api/products/:id` - Update product (authenticated)
- `DELETE /api/products/:id` - Delete product (authenticated)

**Orders**
- `POST /api/orders` - Create order (authenticated)
- `GET /api/orders` - Get customer orders (authenticated)
- `GET /api/orders/entrepreneur/orders` - Get entrepreneur orders (authenticated)
- `GET /api/orders/:id` - Get order details (authenticated)

## Database Models

### User
- Basic info: name, email, password, phone, location, role
- Entrepreneur profile: business name, category, bio, skills, verification status
- Ratings and earnings tracking

### Product
- Name, description, category, price, stock
- Images, ratings, reviews
- Entrepreneur reference

### Service
- Name, description, base price
- Availability schedule (weekly)
- Ratings and reviews

### Order
- Customer and entrepreneur references
- Items with quantities and prices
- Delivery address and payment info
- Status tracking (pending → confirmed → shipped → delivered)

### ServiceRequest
- Customer and entrepreneur references
- Service reference
- Request details and estimated/final pricing
- Status tracking (pending → accepted → completed)

### Review
- Reviewer and entrepreneur references
- Rating (1-5) and comment
- Linked to product, service, or order

## Authentication Flow

1. User registers with email and password
2. Password is hashed using bcryptjs
3. User receives JWT token upon login
4. Token is stored in localStorage on frontend
5. Token is sent with every authenticated request in Authorization header
6. Backend verifies token before allowing access

## Core Features Implementation

### Search & Filter
- Products: By category, price range, search term
- Services: By category, availability, price range
- Entrepreneurs: By name, business, category, rating

### Order Management
- Create orders with multiple products
- Stock management (automatic updates)
- Order status tracking
- Cancellation with refund support

### Service Requests
- Request services with custom requirements
- Entrepreneur approval workflow
- Price negotiation
- Status tracking

### Ratings & Reviews
- Leave ratings (1-5 stars)
- Write detailed reviews
- Automatic rating aggregation
- Review moderation (admin)

## Security Considerations

✅ **Implemented**
- Password hashing with bcryptjs
- JWT token-based authentication
- CORS enabled
- Input validation

⚠️ **Recommendations for Production**
- Add rate limiting on endpoints
- Implement request validation middleware
- Use HTTPS only
- Add email verification
- Implement 2FA for entrepreneurs
- Add payment gateway integration (Stripe/Razorpay)
- Use environment-based configuration
- Add logging and monitoring
- Implement refresh tokens for JWT

## Performance Optimizations

- Database indexing on frequently queried fields
- Pagination for list endpoints
- Image optimization and CDN for product images
- Lazy loading in frontend
- Caching strategies for frequently accessed data

## Testing

Run tests with:
```bash
npm test
```

### Backend Tests
- Authentication flow
- CRUD operations for products/services
- Order creation and management
- Authorization checks

### Frontend Tests
- Component rendering
- Form submissions
- Navigation flow
- API integration

## Deployment

### Backend Deployment

**Using Heroku:**
```bash
heroku create your-app-name
heroku config:set MONGO_URI=your_mongo_uri
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

**Using AWS:**
- Deploy to EC2 or Lambda
- Use RDS for MongoDB alternatives
- Configure security groups

### Frontend Deployment

**Using Vercel:**
```bash
npm install -g vercel
vercel
```

**Using Netlify:**
```bash
npm run build
netlify deploy --prod --dir=dist
```

## Environment Variables

**Backend (.env)**
```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/hunarhub
JWT_SECRET=your_secret_key_here
FRONTEND_URL=http://localhost:5173
```

**Frontend (.env)**
```
VITE_API_URL=http://localhost:5000/api
```

## Future Enhancements

- 📱 Mobile applications (React Native)
- 💳 Online payment integration (Stripe, Razorpay, PayPal)
- 📦 Logistics and delivery tracking
- 🎓 Skill training and certification modules
- 🤖 AI-powered recommendations
- 💬 Real-time chat between customers and entrepreneurs
- 📊 Advanced analytics dashboard
- 🌍 Multi-language support
- 📍 Location-based services
- 🎁 Referral and loyalty programs

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Email: support@hunarhub.com
- Contact: +91-XXXXXXXXXX

## Acknowledgments

- Unified Mentor for the project guidelines
- All micro-entrepreneurs who inspire this platform
- Community contributors and testers

---

**Made with ❤️ for Local Entrepreneurs**
