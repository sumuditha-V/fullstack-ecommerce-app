# MERN E-Commerce Web Application

This project is a full-stack e-commerce application built with the MERN stack. It is organized as three separate apps:

- `frontend` - customer-facing shopping site
- `admin` - admin dashboard for product and order management
- `backend` - Express API with MongoDB, authentication, cart, product, and order logic

The application supports user registration and login, product browsing, cart management, checkout with Cash on Delivery and Stripe, and admin-side product/order management.

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Toastify

### Backend

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- bcrypt
- Multer
- Cloudinary
- Stripe
- Razorpay package included

### Admin Panel

- React
- Vite
- Tailwind CSS
- Axios
- React Toastify

## Project Structure

```text
E-Commerce_Web-main/
|-- admin/
|   |-- public/
|   |-- src/
|   |   |-- assets/
|   |   |-- components/
|   |   |-- pages/
|   |   |-- App.jsx
|   |   `-- main.jsx
|   |-- package.json
|   `-- vite.config.js
|-- backend/
|   |-- config/
|   |   |-- Cloudinary.js
|   |   `-- MongoDB.js
|   |-- controllers/
|   |-- middle_wear/
|   |-- moddles/
|   |-- routes/
|   |-- package.json
|   `-- server.js
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- assets/
|   |   |-- components/
|   |   |-- context/
|   |   |-- pages/
|   |   |-- App.jsx
|   |   `-- main.jsx
|   |-- package.json
|   `-- vite.config.js
`-- README.md
```

## Features

### Customer Site

- Browse all products
- Filter through the collection page
- View single product details
- Choose product sizes
- Add products to cart
- Update cart quantities
- Register and log in
- Place orders with:
  - Cash on Delivery
  - Stripe checkout
- View personal orders

### Admin Dashboard

- Admin login
- Add products with up to 4 images
- Upload product images to Cloudinary
- View all products
- Remove products
- View all orders
- Update order status

### Backend API

- User authentication with JWT
- Admin authentication
- Product CRUD-related endpoints
- Cart persistence in MongoDB
- Order creation and order tracking
- Stripe checkout session creation

## Applications and Default Ports

These are the defaults currently used in the code:

- Backend API: `http://localhost:4000`
- Frontend dev server: Vite default, usually `http://localhost:5173`
- Admin dev server: Vite default, usually `http://localhost:5174`

Both frontend apps read the backend base URL from:

- `VITE_BACKEND_URL`

If not set, they fall back to:

- `http://localhost:4000/`

## Environment Variables

Create a `.env` file inside the `backend` folder.

### `backend/.env`

```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017
JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret

STRIPE_SECRET_KEY=your_stripe_secret_key

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
```

Notes:

- The backend connects using `${MONGODB_URI}/e-commerce`, so the value should be the base MongoDB connection string.
- Razorpay package exists in the backend dependencies, but the Razorpay order placement handler is currently empty.

Create `.env` files for the frontend and admin apps if you want to override the backend URL.

### `frontend/.env`

```env
VITE_BACKEND_URL=http://localhost:4000/
```

### `admin/.env`

```env
VITE_BACKEND_URL=http://localhost:4000/
```

## Installation

Install dependencies separately for each app.

### 1. Backend

```bash
cd backend
npm install
```

### 2. Frontend

```bash
cd frontend
npm install
```

### 3. Admin

```bash
cd admin
npm install
```

## Running the Project

Open three terminals and run each app separately.

### Start the backend

```bash
cd backend
npm run server
```

Available scripts:

- `npm start` - run backend with Node
- `npm run server` - run backend with Nodemon

### Start the frontend

```bash
cd frontend
npm run dev
```

### Start the admin dashboard

```bash
cd admin
npm run dev
```

## Build Commands

### Frontend

```bash
cd frontend
npm run build
```

### Admin

```bash
cd admin
npm run build
```

## Frontend Pages

The customer-facing app currently includes these routes:

- `/` - home page
- `/collection` - product collection listing
- `/about` - about page
- `/contact` - contact page
- `/product/:productId` - single product page
- `/cart` - shopping cart
- `/login` - user login/register page
- `/place-order` - checkout page
- `/orders` - user order history
- `/verify` - Stripe payment verification page

## Admin Pages

The admin panel currently includes:

- `/add` - add a new product
- `/list` - list and remove products
- `/orders` - view and update order statuses

If no admin token is stored, the admin app shows the login screen first.

## Backend API Overview

Base URL:

```text
http://localhost:4000/api
```

### User Routes

- `POST /user/register` - register a new user
- `POST /user/login` - user login
- `POST /user/admin` - admin login

### Product Routes

- `POST /product/add` - add product, admin only
- `POST /product/remove` - remove product, admin only
- `POST /product/single` - get one product
- `GET /product/list` - get all products

### Cart Routes

- `POST /cart/get` - get logged-in user's cart
- `POST /cart/add` - add item to cart
- `POST /cart/update` - update item quantity

### Order Routes

- `POST /order/list` - get all orders, admin only
- `POST /order/status` - update order status, admin only
- `POST /order/place` - place Cash on Delivery order
- `POST /order/stripe` - create Stripe checkout session
- `POST /order/razorpay` - placeholder route for Razorpay
- `POST /order/userorders` - get current user's orders
- `POST /order/verifyStripe` - verify Stripe payment result

## Important Implementation Notes

- Product images are uploaded through Multer and stored in Cloudinary.
- Cart data is stored inside the user document in MongoDB.
- User authentication uses JWT tokens sent through request headers as `token`.
- Admin access is controlled through credentials stored in environment variables.
- The backend root route `/` returns `API Working`.

## Known Limitations

These are based on the current codebase:

- Razorpay flow is not implemented yet even though the dependency and route exist.
- There is no root-level workspace script to run all three apps together.
- Folder names such as `moddles` and `middle_wear` are used in the current source and should not be renamed unless imports are updated too.
- The repository is structured as three separate Node projects, so dependencies must be installed in each folder independently.

## Suggested Future Improvements

- Add a root `package.json` with concurrent startup scripts
- Add Docker support
- Add tests for backend controllers and frontend flows
- Complete Razorpay integration
- Add product editing support in the admin dashboard
- Add API documentation with Swagger or Postman collection
- Add deployment instructions for MongoDB Atlas, Vercel, and Render

## Deployment Notes

The repo already contains:

- `frontend/vercel.json`
- `admin/vercel.json`
- `backend/vercel.json`

This suggests the apps were prepared for separate deployment targets.

## License

No explicit project license is defined in the root of this repository.
