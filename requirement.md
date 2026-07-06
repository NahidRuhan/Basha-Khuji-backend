# Backend Project

## ⚠️ Mandatory Requirements

> [!CAUTION]
> **MANDATORY - READ CAREFULLY**
>
> The following **SIX requirements are MANDATORY**:
>
> 1. **API Documentation** - Provide Postman collection or Swagger/OpenAPI docs covering all endpoints
> 2. **Consistent Error Responses** - All errors must return structured JSON (`{ success, message, errorDetails }`)
> 3. **Commits** - 20 meaningful backend commits with descriptive messages
> 4. **Input Validation** - Server-side validation on all endpoints with proper error messages
> 5. **Admin Credentials** - Provide working admin email & password
> 6. **Payment Integration** - Must integrate **Stripe** or **SSLCommerz** for processing payments. Simulated/fake payments (Cash on Delivery, Pay Later) are **NOT** accepted.
>
> ❌ **Failure to complete any of these = 0 MARKS**

---

## 🎯 Key Rules

- **Roles**: Each project has 3 fixed roles. Users select during registration.
- **Payment**: Payment integration is **MANDATORY**. You must integrate either **Stripe** or **SSLCommerz** for processing payments. Include endpoints for creating payment intents/sessions, handling payment confirmations, and tracking payment status.
- **No Frontend Required**: This is a backend-only assignment. Test your API via Postman/Thunder Client.
- **Flexibility**: Endpoints listed in each variant are examples. Modify as needed.

---

# RentNest 🏠

**"Find & List Rental Properties with Ease"**

---

## Project Overview

RentNest is a backend API for a rental property marketplace. Landlords can list properties, manage availability, and approve or reject rental requests. Tenants can browse listings, submit rental requests, and leave reviews. Admins oversee the entire platform, managing users and moderating content.

---

## Roles & Permissions

| Role         | Description                         | Key Permissions                                                        |
| ------------ | ----------------------------------- | ---------------------------------------------------------------------- |
| **Tenant**   | Users looking for rental properties | Browse listings, submit rental requests, leave reviews, manage profile |
| **Landlord** | Property owners who list rentals    | Create/manage listings, approve/reject requests, view tenant history   |
| **Admin**    | Platform moderators                 | Manage all users, oversee all listings & requests, manage categories   |

> 💡 **Note**: Users select their role during registration.

---

## 🛠️ Tech Stack

### Backend

| Technology        | Purpose                   |
| ----------------- | ------------------------- |
| Node.js + Express | REST API                  |
| TypeScript        | Type safety (recommended) |
| Postgres + Prisma | Database + ORM            |
| JWT               | Authentication            |

### Deployment

| Service       | Purpose                |
| ------------- | ---------------------- |
| Vercel/Render | Backend API deployment |

---

## Features

### Public Features

- Browse all available rental properties
- Search and filter by location, price range, property type, and amenities
- View detailed property listings

### Tenant Features

- Register and login as tenant
- Submit rental requests for properties
- **Make payments via Stripe or SSLCommerz after rental request is approved**
- **View payment history and payment status**
- View rental request history (pending, approved, rejected)
- Leave reviews after a completed rental
- Manage profile

### Landlord Features

- Register and login as landlord
- Create, edit, and remove property listings
- Set property availability status
- Approve or reject rental requests
- View rental history and tenant reviews

### Admin Features

- View all users (tenants and landlords)
- Manage user status (ban/unban)
- View all listings and rental requests
- Manage property categories

---

## API Endpoints

> ⚠️ **Note**: These endpoints are examples. You may add, edit, or remove endpoints based on your implementation needs.

### Authentication

| Method | Endpoint             | Description                         |
| ------ | -------------------- | ----------------------------------- |
| POST   | `/api/auth/register` | Register new user (tenant/landlord) |
| POST   | `/api/auth/login`    | Login user, return JWT              |
| GET    | `/api/auth/me`       | Get current authenticated user      |

### Properties (Public)

| Method | Endpoint              | Description                                             |
| ------ | --------------------- | ------------------------------------------------------- |
| GET    | `/api/properties`     | Get all properties with filters (location, price, type) |
| GET    | `/api/properties/:id` | Get property details                                    |
| GET    | `/api/categories`     | Get all property categories                             |

### Landlord Management

| Method | Endpoint                       | Description                                       |
| ------ | ------------------------------ | ------------------------------------------------- |
| POST   | `/api/landlord/properties`     | Create new property listing                       |
| PUT    | `/api/landlord/properties/:id` | Update property listing                           |
| DELETE | `/api/landlord/properties/:id` | Remove property listing                           |
| GET    | `/api/landlord/requests`       | Get all rental requests for landlord's properties |
| PATCH  | `/api/landlord/requests/:id`   | Approve or reject a rental request                |

### Rental Requests

| Method | Endpoint           | Description                      |
| ------ | ------------------ | -------------------------------- |
| POST   | `/api/rentals`     | Submit a rental request (tenant) |
| GET    | `/api/rentals`     | Get user's rental requests       |
| GET    | `/api/rentals/:id` | Get rental request details       |

### Payments (Stripe / SSLCommerz)

| Method | Endpoint                | Description                                            |
| ------ | ----------------------- | ------------------------------------------------------ |
| POST   | `/api/payments/create`  | Create a payment intent/session for an approved rental |
| POST   | `/api/payments/confirm` | Confirm/verify payment (webhook or callback)           |
| GET    | `/api/payments`         | Get user's payment history                             |
| GET    | `/api/payments/:id`     | Get payment details                                    |

### Reviews

| Method | Endpoint       | Description                            |
| ------ | -------------- | -------------------------------------- |
| POST   | `/api/reviews` | Create review (after completed rental) |

### Admin

| Method | Endpoint                | Description                    |
| ------ | ----------------------- | ------------------------------ |
| GET    | `/api/admin/users`      | Get all users                  |
| PATCH  | `/api/admin/users/:id`  | Update user status (ban/unban) |
| GET    | `/api/admin/properties` | Get all properties             |
| GET    | `/api/admin/rentals`    | Get all rental requests        |

---

## Database Tables

Design your own schema for the following tables:

- **Users** - Store user information, authentication details, and role
- **Properties** - Rental property listings (linked to landlord)
- **Categories** - Property type categories (apartment, house, studio, etc.)
- **RentalRequests** - Rental requests between tenants and landlords
- **Payments** - Payment transactions (transactionId, rentalRequestId, amount, method, provider [Stripe/SSLCommerz], status [pending/completed/failed], paidAt, etc.)
- **Reviews** - Tenant reviews for properties

> 💡 _Think about what fields each table needs based on the features above._

---

## Flow Diagrams

### 🏠 Tenant Journey

```
                              ┌──────────────┐
                              │   Register   │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │   Browse     │
                              │  Properties  │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │View Property │
                              │   Details    │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │   Submit     │
                              │   Request    │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │  Wait for    │
                              │  Approval    │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │  Make Payment│
                              │(Stripe/SSLC) │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │ Leave Review │
                              └──────────────┘
```

### 🏘️ Landlord Journey

```
                              ┌──────────────┐
                              │   Register   │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │   Create     │
                              │  Listings    │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │    View      │
                              │  Requests    │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │   Approve/   │
                              │   Reject     │
                              └──────────────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │   Manage     │
                              │  Properties  │
                              └──────────────┘
```

### 📊 Rental Request Status

```
                              ┌──────────────┐
                              │   PENDING    │
                              └──────────────┘
                               /            \
                              /              \
                       (landlord)       (landlord)
                        approves        rejects
                            /                \
                           ▼                  ▼
                   ┌──────────────┐   ┌──────────────┐
                   │   APPROVED   │   │   REJECTED   │
                   └──────────────┘   └──────────────┘
                          │
                          ▼
                   ┌──────────────┐
                   │   PAYMENT    │
                   │  (Stripe/    │
                   │  SSLCommerz) │
                   └──────────────┘
                          │
                          ▼
                   ┌──────────────┐
                   │    ACTIVE    │
                   │  (move-in)   │
                   └──────────────┘
                          │
                          ▼
                   ┌──────────────┐
                   │  COMPLETED   │
                   └──────────────┘
```

---
