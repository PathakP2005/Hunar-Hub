# HunarHub - Setup & Installation Guide

## System Requirements

- **Node.js**: v14.0.0 or higher
- **npm**: v6.0.0 or higher
- **MongoDB**: v4.4 or higher (local or MongoDB Atlas)
- **Git**: Latest version
- **Modern Web Browser**: Chrome, Firefox, Safari, or Edge

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/Hunar-Hub.git
cd Hunar-Hub
```

### 2. Backend Setup

#### Step 1: Install Dependencies

```bash
cd backend
npm install
```

Expected packages:
- express@^5.2.1
- mongoose@^9.5.0
- bcryptjs@^3.0.3
- jsonwebtoken@^9.0.3
- cors@^2.8.6
- dotenv@^17.4.2
- nodemon@^3.1.14 (dev)

#### Step 2: Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` file with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/hunarhub
# OR for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/hunarhub

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production_12345

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

#### Step 3: Setup MongoDB

**Option A: Local MongoDB**

```bash
# Windows (if using MongoDB Community Edition)
# MongoDB should be running as a service

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or login
3. Create a new project
4. Create a cluster
5. Create a database user
6. Whitelist your IP
7. Copy connection string and update `.env`

#### Step 4: Start the Backend Server

```bash
# Development mode (with hot reload)
npm start

# OR use nodemon directly
npx nodemon server.js
```

Expected output:
```
MongoDB Connected
Server running on port 5000
HunarHub API Running...
```

#### Step 5: Test Backend

```bash
# Test if server is running
curl http://localhost:5000/

# Expected response:
# HunarHub API Running...
```

### 3. Frontend Setup

#### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

Expected packages:
- react@^19.2.5
- react-dom@^19.2.5
- react-router-dom@^6.23.0
- axios@^1.6.7
- tailwindcss@^3.4.1
- postcss@^8.4.38
- autoprefixer@^10.4.17
- lucide-react@^0.383.0

#### Step 2: Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

#### Step 3: Start the Development Server

```bash
npm run dev
```

Expected output:
```
VITE v8.0.9  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

#### Step 4: Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

---

## Detailed Backend Setup

### Database Initialization

The database collections are automatically created when you first:
1. Create a user (User collection)
2. Create a product (Product collection)
3. Create a service (Service collection)
4. Create an order (Order collection)
5. Create a service request (ServiceRequest collection)
6. Create a review (Review collection)

### MongoDB Collections

After running the application for the first time, check your MongoDB:

```bash
# Connect to MongoDB (local)
mongosh

# List databases
show databases

# Switch to hunarhub database
use hunarhub

# List collections
show collections

# View a user
db.users.findOne()
```

### API Testing

#### Using Postman

1. Import the Postman collection from `backend/postman_collection.json`
2. Configure the `{{BASE_URL}}` variable to `http://localhost:5000/api`
3. Configure the `{{TOKEN}}` variable after login
4. Test endpoints

#### Using cURL

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

---

## Detailed Frontend Setup

### Tailwind CSS Configuration

The project uses Tailwind CSS for styling. Configuration is in `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f97316",
        secondary: "#1e40af",
      },
    },
  },
  plugins: [],
}
```

### Building for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## Troubleshooting

### Backend Issues

**"Cannot connect to MongoDB"**
- Ensure MongoDB is running
- Check `MONGO_URI` in `.env`
- Verify MongoDB username/password (for Atlas)
- Check firewall settings

**"Port 5000 already in use"**
```bash
# Find process using port 5000
netstat -ano | findstr :5000  # Windows
lsof -i :5000  # macOS/Linux

# Kill the process
taskkill /PID <PID> /F  # Windows
kill -9 <PID>  # macOS/Linux

# Or change PORT in .env
```

**"JWT_SECRET not set"**
- Ensure `.env` file exists
- Check `JWT_SECRET` variable is set
- Restart server after changes

### Frontend Issues

**"Cannot reach API"**
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in `.env`
- Verify CORS is enabled in backend
- Check browser console for errors

**"Page not loading"**
- Clear browser cache (Ctrl+Shift+Del)
- Hard refresh (Ctrl+Shift+R)
- Check browser console for errors

**"Module not found"**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## Running Tests

### Backend Tests

```bash
# Install testing dependencies
npm install --save-dev jest supertest

# Run tests
npm test
```

### Frontend Tests

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Run tests
npm test
```

---

## Development Workflow

### Creating a Feature

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Backend changes**
   - Create/update models in `backend/models/`
   - Create/update controllers in `backend/controllers/`
   - Create/update routes in `backend/routes/`
   - Test with Postman

3. **Frontend changes**
   - Create/update pages in `frontend/src/pages/`
   - Create/update components in `frontend/src/components/`
   - Update API service in `frontend/src/services/api.js`
   - Test in browser

4. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: Add feature description"
   git push origin feature/your-feature-name
   ```

### Code Quality

**Backend**
- Follow Express best practices
- Use async/await for promises
- Add error handling
- Validate input data

**Frontend**
- Use functional components with hooks
- Keep components small and focused
- Use descriptive prop names
- Follow React best practices

---

## Deployment Guide

### Backend Deployment (Heroku)

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create app**
   ```bash
   heroku create your-app-name
   ```

4. **Set environment variables**
   ```bash
   heroku config:set MONGO_URI=your_mongo_uri
   heroku config:set JWT_SECRET=your_secret
   heroku config:set NODE_ENV=production
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

6. **View logs**
   ```bash
   heroku logs --tail
   ```

### Frontend Deployment (Vercel)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd frontend
   vercel
   ```

3. **Configure environment variables** in Vercel dashboard

### Frontend Deployment (Netlify)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy using Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

---

## Performance Optimization

### Backend
- Add database indexes for frequently queried fields
- Implement pagination
- Use caching for static data
- Monitor API response times

### Frontend
- Lazy load images
- Code splitting with React.lazy()
- Optimize bundle size
- Use React DevTools Profiler

---

## Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Use HTTPS in production
- [ ] Add rate limiting
- [ ] Validate all inputs
- [ ] Use environment variables for sensitive data
- [ ] Enable CORS only for trusted domains
- [ ] Add request logging
- [ ] Implement API versioning
- [ ] Add API authentication
- [ ] Regular security audits

---

## Useful Commands

```bash
# Backend
cd backend
npm install          # Install dependencies
npm start           # Start development server
npm run dev         # Start with nodemon
npm test            # Run tests

# Frontend
cd frontend
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

---

## Getting Help

- Check [API Documentation](./API_DOCUMENTATION.md)
- Review error messages in console
- Check backend logs: `npm start`
- Check browser console (F12)
- Search existing GitHub issues
- Create a new issue with details

---

## Next Steps

1. ✅ Complete initial setup
2. 📖 Read [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
3. 🧪 Test API endpoints with Postman
4. 🎨 Explore frontend components
5. 🚀 Deploy to production

Happy coding! 🚀
