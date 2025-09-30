# Cars API - Car Management System

RESTful API for managing cars, reviews, and services with user authentication support.

## Table of Contents

- [Project Description](#project-description)
- [Technologies](#technologies)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Usage Examples](#usage-examples)
- [Frontend Integration](#frontend-integration)
- [Project Structure](#project-structure)

## Project Description

Cars API is a full-featured system for car management with the following capabilities:
- User registration and authentication
- Car management (CRUD operations)
- Car review system
- Service management
- Car filtering by various criteria
- Photo upload to Cloudinary
- Session-based authentication

## Technologies

- **Node.js** - server platform
- **Express.js** - web framework
- **Sequelize** - ORM for database operations
- **PostgreSQL** - relational database
- **Joi** - data validation
- **Cloudinary** - cloud image storage
- **Multer** - file handling
- **bcrypt** - password hashing
- **express-session** - session management

## Installation

### Prerequisites

- Node.js (version 18 or higher)
- PostgreSQL
- npm or yarn

### Step 1: Clone the repository

```bash
git clone https://github.com/your-username/cars-api.git
cd cars-api
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Database setup

Create PostgreSQL database:

```sql
CREATE DATABASE cars_db;
CREATE USER cars_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE cars_db TO cars_user;
```

## Configuration

### 1. Create .env file

Copy `.env_example` to `.env` and fill in the required values:

```bash
cp .env_example .env
```

### 2. Environment variables setup

```env
# Database
DB_NAME=cars_db
DB_USER=cars_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres

# Server
PORT=3000

# Sessions
SESSION_SECRET=your-super-secret-session-key-here

# Cloudinary (optional)
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
ENABLE_CLOUDINARY=true
```

### 3. Start the server

```bash
# Development
npm run dev

# Production
npm start
```

The server will be available at `http://localhost:3000`

## API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication

#### User registration
```http
POST /admin/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### User login
```http
POST /admin/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### User logout
```http
POST /admin/logout
```

#### Get current user
```http
GET /admin/me
```

#### Refresh session
```http
POST /admin/refresh
```

### Cars

#### Get all cars (with filtering)
```http
GET /cars?year=2020&model=BMW&priceMin=10000&priceMax=50000&bodyStyle=sedan
```

**Filter parameters:**
- `year` - production year
- `model` - model (partial search)
- `priceMin` - minimum price
- `priceMax` - maximum price
- `bodyStyle` - body style (partial search)

#### Get car by ID
```http
GET /cars/:id
```

#### Create car (requires authentication)
```http
POST /cars/create
Authorization: Required
Content-Type: multipart/form-data

{
  "model": "BMW X5",
  "year": 2020,
  "price": 45000,
  "mileage": 15000,
  "bodyStyle": "SUV",
  "specs": "Automatic, AWD",
  "photo": [file]
}
```

#### Update car (requires authentication)
```http
PUT /cars/:id/edit
Authorization: Required
Content-Type: multipart/form-data
```

#### Delete car (requires authentication)
```http
DELETE /cars/:id/delete
Authorization: Required
```

### Reviews

#### Get all reviews
```http
GET /reviews
```

#### Create review (public)
```http
POST /reviews/create
Content-Type: application/json

{
  "content": "Excellent car!",
  "rating": 5,
  "author": "John Doe",
  "car_id": "uuid-here"
}
```

#### Get reviews by car
```http
GET /cars/:id/reviews
```

#### Update review (requires authentication)
```http
PUT /reviews/:id/edit
Authorization: Required
```

#### Delete review (requires authentication)
```http
DELETE /reviews/:id/delete
Authorization: Required
```

### Services

#### Get all services
```http
GET /services
```

#### Create service (requires authentication)
```http
POST /services/create
Authorization: Required
Content-Type: application/json

{
  "type": "Technical inspection",
  "description": "Full technical inspection of the vehicle",
  "price": 500
}
```

## Frontend Integration

### JavaScript/React Example

```javascript
// Basic API class for working with the API
class CarsAPI {
  constructor(baseURL = 'http://localhost:3000') {
    this.baseURL = baseURL;
  }

  // Authentication
  async login(email, password) {
    const response = await fetch(`${this.baseURL}/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for sessions
      body: JSON.stringify({ email, password })
    });
    
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error('Login failed');
  }

  // Get cars with filtering
  async getCars(filters = {}) {
    const queryParams = new URLSearchParams();
    
    if (filters.year) queryParams.append('year', filters.year);
    if (filters.model) queryParams.append('model', filters.model);
    if (filters.priceMin) queryParams.append('priceMin', filters.priceMin);
    if (filters.priceMax) queryParams.append('priceMax', filters.priceMax);
    if (filters.bodyStyle) queryParams.append('bodyStyle', filters.bodyStyle);

    const response = await fetch(`${this.baseURL}/cars?${queryParams}`, {
      credentials: 'include'
    });
    
    return await response.json();
  }

  // Create car
  async createCar(carData, photoFile) {
    const formData = new FormData();
    
    Object.keys(carData).forEach(key => {
      formData.append(key, carData[key]);
    });
    
    if (photoFile) {
      formData.append('photo', photoFile);
    }

    const response = await fetch(`${this.baseURL}/cars/create`, {
      method: 'POST',
      credentials: 'include',
      body: formData
    });
    
    return await response.json();
  }

  // Create review
  async createReview(reviewData) {
    const response = await fetch(`${this.baseURL}/reviews/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData)
    });
    
    return await response.json();
  }
}

// Usage
const api = new CarsAPI();

// Example usage in React component
function CarsList() {
  const [cars, setCars] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const loadCars = async () => {
      try {
        const data = await api.getCars(filters);
        setCars(data.cars);
      } catch (error) {
        console.error('Error loading cars:', error);
      }
    };
    
    loadCars();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div>
      <FilterForm onFilterChange={handleFilterChange} />
      <div className="cars-grid">
        {cars.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
}
```

### HTML/JavaScript Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>Cars API Example</title>
</head>
<body>
    <div id="app">
        <h1>Cars</h1>
        
        <!-- Filter form -->
        <form id="filterForm">
            <input type="number" placeholder="Year" name="year">
            <input type="text" placeholder="Model" name="model">
            <input type="number" placeholder="Min Price" name="priceMin">
            <input type="number" placeholder="Max Price" name="priceMax">
            <input type="text" placeholder="Body Style" name="bodyStyle">
            <button type="submit">Filter</button>
        </form>

        <!-- Cars list -->
        <div id="carsList"></div>
    </div>

    <script>
        const API_BASE = 'http://localhost:3000';
        
        // Function to get cars
        async function getCars(filters = {}) {
            const queryParams = new URLSearchParams(filters);
            const response = await fetch(`${API_BASE}/cars?${queryParams}`);
            const data = await response.json();
            return data.cars;
        }

        // Function to display cars
        function displayCars(cars) {
            const container = document.getElementById('carsList');
            container.innerHTML = cars.map(car => `
                <div class="car-card">
                    <h3>${car.model} (${car.year})</h3>
                    <p>Price: $${car.price}</p>
                    <p>Mileage: ${car.mileage} km</p>
                    <p>Body Style: ${car.bodyStyle}</p>
                    ${car.photo ? `<img src="${car.photo}" alt="${car.model}" style="max-width: 200px;">` : ''}
                </div>
            `).join('');
        }

        // Handle filter form
        document.getElementById('filterForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const filters = Object.fromEntries(formData.entries());
            
            // Remove empty values
            Object.keys(filters).forEach(key => {
                if (!filters[key]) delete filters[key];
            });
            
            try {
                const cars = await getCars(filters);
                displayCars(cars);
            } catch (error) {
                console.error('Error:', error);
            }
        });

        // Load cars on page load
        window.addEventListener('load', async () => {
            try {
                const cars = await getCars();
                displayCars(cars);
            } catch (error) {
                console.error('Error loading cars:', error);
            }
        });
    </script>
</body>
</html>
```

## Project Structure

```
cars/
├── src/
│   ├── controllers/          # Controllers
│   │   ├── carsControllers.js
│   │   ├── reviewsControllers.js
│   │   ├── servicesControllers.js
│   │   └── usersControllers.js
│   ├── db/
│   │   ├── models/           # Database models
│   │   │   ├── Cars.js
│   │   │   ├── Reviews.js
│   │   │   ├── Services.js
│   │   │   ├── User.js
│   │   │   └── Session.js
│   │   └── sequalize.js      # Sequelize configuration
│   ├── middleware/           # Middleware
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── isBody.js
│   ├── routes/              # Routes
│   │   ├── carsRoute.js
│   │   ├── reviewsRoute.js
│   │   ├── servicesRoute.js
│   │   └── usersRoute.js
│   ├── schemas/             # Validation schemas
│   │   ├── carSchemas.js
│   │   ├── carFilterSchemas.js
│   │   ├── reviewSchemas.js
│   │   └── serviceSchemas.js
│   ├── services/            # Business logic
│   │   ├── carsServices.js
│   │   ├── reviewsServices.js
│   │   ├── servicesServices.js
│   │   ├── usersServices.js
│   │   └── sessionServices.js
│   ├── utils/               # Utilities
│   │   ├── cloudinary.js
│   │   ├── controllerWrapper.js
│   │   ├── env.js
│   │   ├── multer.js
│   │   └── validBody.js
│   ├── app.js               # Express configuration
│   └── server.js            # Server startup
├── .env                     # Environment variables
├── .env_example            # Environment variables example
├── package.json
└── README.md
```

## 🔧 Additional Features

### Car Filtering
The API supports complex car filtering:
- By production year (exact value)
- By model (partial search)
- By price range (minimum/maximum)
- By body style (partial search)

### Image Upload
- Support for car photo uploads
- Automatic saving to Cloudinary
- File type and size validation

### Session Authentication
- Secure session storage in database
- Automatic session refresh
- Expired session cleanup

## Debugging

### Check database connection
```bash
# Check server logs for message:
# "Database connected successfully!"
```

### Check environment variables
```bash
# Make sure .env file exists and contains all required variables
cat .env
```

### Test API
```bash
# Test basic endpoint
curl http://localhost:3000/cars

# Test with filtering
curl "http://localhost:3000/cars?year=2020&model=BMW"
```

## License

This project is developed for educational purposes.
