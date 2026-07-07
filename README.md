# Basha Khuji 🏠

**"Find & List Rental Properties with Ease"**

🚀 **Live Demo:** [https://basha-khuji-backend.vercel.app/](https://basha-khuji-backend.vercel.app/)

Basha Khuji is a robust backend API for a rental property marketplace. Landlords can list properties, manage availability, and approve or reject rental requests. Tenants can browse listings, submit rental requests, and securely process payments. Admins oversee the entire platform, managing users and moderating content.

## Features

### 👤 Tenant Features

- Register and login as a tenant.
- Browse all available rental properties with advanced filtering (price, location, amenities).
- Submit rental requests for desired properties.
- **Make secure payments via Stripe** after a rental request is approved.
- View payment history and track payment status.
- Leave reviews for properties after a completed rental.

### 🔑 Landlord Features

- Register and login as a landlord.
- Create, edit, and remove property listings.
- Automatically manage property availability based on active rentals.
- Approve or reject rental requests.
- View rental history and read tenant reviews for their properties.

### 🛡️ Admin Features

- View all users (tenants and landlords).
- Manage user status (ban/unban malicious users).
- View all listings and rental requests across the platform.
- Manage and create property categories.

## 🛠️ Tech Stack

- **Framework**: Node.js + Express
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (Access & Refresh tokens securely stored in cookies)
- **Payment Gateway**: Stripe Checkout & Webhooks

## 🗄️ Database Models

- **Users**: Stores user information, authentication details, and role (`ADMIN`, `LANDLORD`, `TENANT`).
- **Categories**: Property type categories (Apartment, House, Studio, etc.).
- **Locations**: Geographic locations/cities for the properties.
- **Properties**: Rental property listings linked to landlords, categories, and locations.
- **RentalRequests**: Tracks rental applications and their lifecycles (`PENDING`, `APPROVED`, `REJECTED`, `ACTIVE`, `COMPLETED`).
- **Payments**: Tracks secure Stripe payment transactions, amounts, and statuses linked to approved rentals.
- **Reviews**: Tenant reviews and ratings for properties after a completed lease.

## 📚 API Documentation

Below is a summary of the available endpoints. For full documentation including request bodies, headers, and exact JSON response formats, please see the **[Full API Documentation](./api.md)**.

### 🔐 Authentication & Users
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/user/register` | Register new user |
| `POST` | `/api/auth/login` | Login user, get tokens |
| `POST` | `/api/auth/refresh-token` | Refresh access token |
| `POST` | `/api/auth/logout` | Logout user |
| `GET`  | `/api/auth/me` | Get current user |
| `PATCH`| `/api/user/my-profile` | Update user profile |

### 🌍 Public Endpoints
| Method | Endpoint | Description |
|---|---|---|
| `GET`  | `/api/properties` | Get all properties (with filters) |
| `GET`  | `/api/properties/category` | Get all property categories |
| `GET`  | `/api/properties/:propertyId` | Get property details |

### 🔑 Landlord Features
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/landlord/properties` | Create new property listing |
| `PUT`  | `/api/landlord/properties/:id` | Update property |
| `DELETE` | `/api/landlord/properties/:id`| Delete property |
| `GET`  | `/api/landlord/my-properties` | Get landlord's own properties |
| `GET`  | `/api/landlord/requests` | Get requests for landlord's properties |
| `PATCH`| `/api/landlord/requests/:id` | Approve or reject a request |

### 👤 Tenant Features
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/requests` | Submit a rental request |
| `GET`  | `/api/requests` | Get user's rental requests |
| `GET`  | `/api/requests/:id` | Get rental request details |
| `POST` | `/api/reviews` | Create a review for a completed rental |

### 💳 Payments (Stripe)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/payments/create` | Create a Stripe checkout session |
| `GET`  | `/api/payments` | Get user's payment history |
| `GET`  | `/api/payments/:id` | Get payment details |
| `POST` | `/api/payments/webhook` | Stripe webhook for payment confirmation |

### 🛡️ Admin Features
| Method | Endpoint | Description |
|---|---|---|
| `GET`  | `/api/admin/users` | Get all users |
| `PATCH`| `/api/admin/users/:userId` | Update user status (ban/unban) |
| `GET`  | `/api/admin/rentals` | Get all rental requests in system |
| `POST` | `/api/admin/categories` | Create a new category |

## 🚀 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/NahidRuhan/Basha-Khuji.git
   cd Basha-Khuji
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your database and JWT secrets:

   ```env
   PORT=8000
   DATABASE_URL="postgresql://user:password@localhost:5432/rentnest"
   JWT_ACCESS_SECRET="your_access_secret"
   JWT_REFRESH_SECRET="your_refresh_secret"
   JWT_ACCESS_EXPIRES_IN="1d"
   JWT_REFRESH_EXPIRES_IN="365d"
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   ```

4. **Run Prisma Migrations & Seed Data**

   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Testing with Postman**
   A complete Postman collection is included in the root directory: `Basha Khuji.postman_collection.json`. Import this file into Postman to easily test all available endpoints.

## 🌍 Deployment

For detailed instructions on how this project is configured for deployment, please refer to the **[Deployment Guide](./deployment.md)**.
