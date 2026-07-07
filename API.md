# Rent Nest API Documentation

## Auth & Users

### 1. Register User

- **Endpoint**: `/api/user/register`
- **Method**: `POST`
- **Description**: Registers a new user (Tenant or Landlord) in the system.

**Request Body:**

```json
{
  "userName": "Test Tenant",
  "email": "tenant2@example.com",
  "password": "password123",
  "role": "TENANT" // Can be "TENANT" or "LANDLORD"
}
```

**Success Response:**

- **Code:** `201 CREATED`
- **Content:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "User created successfully!",
  "data": {
    "user": {
      "userId": "aefba961-f5c7-4f60-962a-f0690ffbbb94",
      "userName": "Test Tenant",
      "profileImage": null,
      "email": "tenant2@example.com",
      "phoneNumber": null,
      "occupation": null,
      "address": null,
      "role": "TENANT",
      "status": "ACTIVE",
      "createdAt": "2026-07-07T00:00:00.000Z",
      "updatedAt": "2026-07-07T00:00:00.000Z"
    }
  }
}
```

### 2. Login User

- **Endpoint**: `/api/auth/login`
- **Method**: `POST`
- **Description**: Authenticates a user and returns access and refresh tokens.

**Request Body:**

```json
{
  "email": "tenant2@example.com",
  "password": "password123"
}
```

**Success Response:**

- **Code:** `200 OK`
- **Content:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User logged in successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI...",
    "refreshToken": "eyJhbGciOiJIUzI..."
  }
}
```

**Error Responses:**
- **500 Internal Server Error**: Validation Error (e.g., Email and Password are required)
- **400 Bad Request**: Invalid credentials (Prisma error)

### 3. Refresh Token

- **Endpoint**: `/api/auth/refresh-token`
- **Method**: `POST`
- **Description**: Refreshes the access token using the refresh token stored in cookies.

**Request Headers (Cookies):**

```text
Cookie: refreshToken=eyJhbGciOiJIUzI...
```

**Success Response:**

- **Code:** `200 OK`
- **Content:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Access token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC..."
  }
}
```

**Error Responses:**
- **500 Internal Server Error**: Refresh token is required
- **500 Internal Server Error**: Invalid refresh token

### 4. Get Current User

- **Endpoint**: `/api/auth/me`
- **Method**: `GET`
- **Description**: Returns the currently authenticated user's details.

**Request Headers:**

```text
Authorization: Bearer <accessToken>
```

**Success Response:**

- **Code:** `200 OK`
- **Content:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User fetched successfully",
  "data": {
    "email": "tenant2@example.com",
    "userName": "Test Tenant",
    "userId": "aefba961-f5c7-4f60-962a-f0690ffbbb94",
    "role": "TENANT"
  }
}
```

**Error Responses:**
- **500 Internal Server Error**: You are not logged in. Please log in to access this resource.
- **500 Internal Server Error**: Forbidden. You don't have permission to access this resource.

### 5. Update Profile

- **Endpoint**: `/api/user/my-profile`
- **Method**: `PATCH`
- **Description**: Updates the profile of the currently authenticated user.

**Request Headers:**

```text
Authorization: Bearer <accessToken>
```

**Request Body (All fields optional):**

```json
{
  "userName": "Updated Name",
  "profileImage": "https://example.com/image.png",
  "phoneNumber": "+1234567890",
  "occupation": "Software Engineer",
  "address": "123 Main St"
}
```

**Success Response:**

- **Code:** `200 OK`
- **Content:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Profile updated successfully!",
  "data": {
    "user": {
      "userId": "aefba961-f5c7-4f60-962a-f0690ffbbb94",
      "userName": "Test Tenant",
      "profileImage": null,
      "email": "tenant2@example.com",
      "phoneNumber": "+1234567890",
      "occupation": null,
      "address": "123 Main St",
      "role": "TENANT",
      "status": "ACTIVE",
      "createdAt": "2026-07-07T00:00:00.000Z",
      "updatedAt": "2026-07-07T00:00:00.000Z"
    }
  }
}
```

## Landlord APIs

### 1. Create Property

- **Endpoint**: `/api/landlord/properties`
- **Method**: `POST`
- **Description**: Creates a new property listing. Accessible only to users with the `LANDLORD` role.

**Request Headers:**

```text
Authorization: Bearer <accessToken>
```

**Request Body:**

```json
{
  "categoryName": "Apartment",
  "locationName": "Banani",
  "propertyName": "Test Apartment 101",
  "price": 45000,
  "address": "Banani Road 11, House 2",
  "description": "A nice test apartment.",
  "amenities": ["Wi-Fi", "Gym"],
  "vacantFrom": "2026-08-01T00:00:00.000Z",
  "images": ["image1.jpg", "image2.jpg"],
  "bedroomCount": 3,
  "squarefoot": 1500
}
```

**Success Response:**

- **Code:** `201 CREATED`
- **Content:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Property created successfully",
  "data": {
    "propertyId": "5548dabe-442c-4095-b63f-4025865c8c6e",
    "userId": "826f67a7-932f-4f54-b1a7-3cbbe74d952b",
    "categoryId": "3a8ffb09-f28c-419f-9b3f-5168f137d2e4",
    "locationId": "48e70093-7c46-44ad-ab76-c0e39411cb8f",
    "propertyName": "Test Apartment 101",
    "price": 45000,
    "address": "Banani Road 11, House 2",
    "description": "A nice test apartment.",
    "isAvailable": true,
    "amenities": [
      "Wi-Fi",
      "Gym"
    ],
    "vacantFrom": "2026-08-01T00:00:00.000Z",
    "images": [
      "image1.jpg",
      "image2.jpg"
    ],
    "bedroomCount": 3,
    "squarefoot": 1500,
    "createdAt": "2026-07-07T00:00:00.000Z",
    "updatedAt": "2026-07-07T00:00:00.000Z"
  }
}
```

**Error Responses:**
- **500 Internal Server Error**: Missing required field: {fieldName}
- **500 Internal Server Error**: Category not found / Location not found
- **500 Internal Server Error**: Forbidden. You don't have permission to access this resource. (If user is not a LANDLORD)

### 2. Update Property

- **Endpoint**: `/api/landlord/properties/:propertyId`
- **Method**: `PUT`
- **Description**: Updates an existing property. Accessible only to the landlord who owns the property. Fields are optional.

**Request Headers:**

```text
Authorization: Bearer <accessToken>
```

**Request Body (All fields optional):**

```json
{
  "propertyName": "Successfully Updated Property!",
  "price": 99999
}
```

**Success Response:**

- **Code:** `200 OK`
- **Content:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Property updated successfully",
  "data": {
    "propertyId": "5c9a99f8-7a8c-47c6-a616-28fdc5a0775f",
    "userId": "826f67a7-932f-4f54-b1a7-3cbbe74d952b",
    "categoryId": "3a8ffb09-f28c-419f-9b3f-5168f137d2e4",
    "locationId": "48e70093-7c46-44ad-ab76-c0e39411cb8f",
    "propertyName": "Successfully Updated Property!",
    "price": 99999,
    "address": "123 Update St",
    "description": "Temp description",
    "isAvailable": true,
    "amenities": ["Wi-Fi"],
    "vacantFrom": "2026-08-01T00:00:00.000Z",
    "images": ["img.jpg"],
    "bedroomCount": 1,
    "squarefoot": 500,
    "createdAt": "2026-07-07T00:00:00.000Z",
    "updatedAt": "2026-07-07T00:00:00.000Z"
  }
}
```

**Error Responses:**
- **500 Internal Server Error**: Property not found
- **500 Internal Server Error**: You are not authorized to update this property
- **500 Internal Server Error**: Category not found / Location not found

### 3. Delete Property

- **Endpoint**: `/api/landlord/properties/:propertyId`
- **Method**: `DELETE`
- **Description**: Deletes an existing property. Accessible only to the landlord who owns the property. Fails if there are active rental requests associated with the property.

**Request Headers:**

```text
Authorization: Bearer <accessToken>
```

**Success Response:**

- **Code:** `200 OK`
- **Content:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Property deleted successfully",
  "data": {
    "propertyId": "22fb9681-3a6c-468e-9fcc-e6117e345253",
    "userId": "826f67a7-932f-4f54-b1a7-3cbbe74d952b",
    "categoryId": "3a8ffb09-f28c-419f-9b3f-5168f137d2e4",
    "locationId": "48e70093-7c46-44ad-ab76-c0e39411cb8f",
    "propertyName": "To Be Deleted Property",
    "price": 5000,
    "address": "123 Delete St",
    "description": "Temp description",
    "isAvailable": true,
    "amenities": [
      "Wi-Fi"
    ],
    "vacantFrom": "2026-08-01T00:00:00.000Z",
    "images": [
      "img.jpg"
    ],
    "bedroomCount": 1,
    "squarefoot": 500,
    "createdAt": "2026-07-07T00:00:00.000Z",
    "updatedAt": "2026-07-07T00:00:00.000Z"
  }
}
```

**Error Responses:**
- **500 Internal Server Error**: Property not found
- **500 Internal Server Error**: You are not authorized to delete this property
- **500 Internal Server Error**: Cannot delete property that has active rental requests. Please resolve or delete the requests first.

### 4. Get Rental Requests

- **Endpoint**: `/api/landlord/requests`
- **Method**: `GET`
- **Description**: Retrieves all rental requests made for properties owned by the currently authenticated landlord.

**Request Headers:**

```text
Authorization: Bearer <accessToken>
```

**Success Response:**

- **Code:** `200 OK`
- **Content:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Requests fetched successfully",
  "data": [
    {
      "requestId": "689ad4c7-764e-40e7-89b4-0ce4f4291b9c",
      "userId": "e0b2e3b0-7322-4f9c-b007-b19db9909122",
      "propertyId": "c7875990-1521-4478-a3bf-f5bb1bff76fb",
      "message": "Hi, I am interested in Beautiful Apartment in Shantinagar #33. Is it available for a viewing?",
      "status": "PENDING",
      "createdAt": "2026-07-06T00:00:00.000Z",
      "updatedAt": "2026-07-06T00:00:00.000Z",
      "property": {
        "propertyId": "c7875990-1521-4478-a3bf-f5bb1bff76fb",
        "propertyName": "Beautiful Apartment in Shantinagar #33",
        "price": "24925"
      },
      "user": {
        "userId": "e0b2e3b0-7322-4f9c-b007-b19db9909122",
        "userName": "Test Tenant 3",
        "email": "tenant3@test.com",
        "profileImage": null,
        "phoneNumber": null
      }
    }
  ]
}
```

**Error Responses:**
- **500 Internal Server Error**: Forbidden. You don't have permission to access this resource. (If user is not a LANDLORD)

### 5. Update Rental Request Status

- **Endpoint**: `/api/landlord/requests/:requestId`
- **Method**: `PATCH`
- **Description**: Updates the status of a specific rental request. Accessible only to the landlord who owns the associated property.

**Request Headers:**

```text
Authorization: Bearer <accessToken>
```

**Request Body:**

```json
{
  "status": "APPROVED" // Must be one of: PENDING, APPROVED, REJECTED, ACTIVE, COMPLETED
}
```

**Success Response:**

- **Code:** `200 OK`
- **Content:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Request updated successfully",
  "data": {
    "requestId": "689ad4c7-764e-40e7-89b4-0ce4f4291b9c",
    "userId": "e0b2e3b0-7322-4f9c-b007-b19db9909122",
    "propertyId": "c7875990-1521-4478-a3bf-f5bb1bff76fb",
    "message": "Hi, I am interested in Beautiful Apartment in Shantinagar #33. Is it available for a viewing?",
    "status": "APPROVED",
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-07T00:00:00.000Z"
  }
}
```

**Error Responses:**
- **500 Internal Server Error**: Missing required field: status
- **500 Internal Server Error**: Invalid status. Must be one of: PENDING, APPROVED, REJECTED, ACTIVE, COMPLETED
- **500 Internal Server Error**: Request not found
- **500 Internal Server Error**: You are not authorized to update this request

## Admin APIs

### 1. Get All Users

- **Endpoint**: `/api/admin/users`
- **Method**: `GET`
- **Description**: Retrieves a list of all users in the system. Accessible only to users with the `ADMIN` role. Passwords are safely excluded.

**Request Headers:**

```text
Authorization: Bearer <accessToken>
```

**Success Response:**

- **Code:** `200 OK`
- **Content:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "All users fetched successfully",
  "data": {
    "user": [
      {
        "userId": "789109ed-94c2-4687-bf0f-9ee7c731c608",
        "userName": "test admin",
        "profileImage": "example.com",
        "email": "testadmin@gmail.com",
        "phoneNumber": null,
        "occupation": null,
        "address": null,
        "role": "ADMIN",
        "status": "ACTIVE",
        "createdAt": "2026-07-07T00:00:00.000Z",
        "updatedAt": "2026-07-07T00:00:00.000Z"
      }
    ]
  }
}
```

**Error Responses:**
- **500 Internal Server Error**: You are not logged in. Please log in to access this resource.
- **500 Internal Server Error**: Forbidden. You don't have permission to access this resource. (If user is not an ADMIN)

### 2. Change User Status

- **Endpoint**: `/api/admin/users/:userId`
- **Method**: `PATCH`
- **Description**: Updates the status of a specific user. Accessible only to users with the `ADMIN` role.

**Request Headers:**

```text
Authorization: Bearer <accessToken>
```

**Request Body:**

```json
{
  "status": "BANNED" // Must be one of: ACTIVE, BANNED
}
```

**Success Response:**

- **Code:** `200 OK`
- **Content:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User status changed successfully!",
  "data": {
    "user": {
      "userId": "1b5a8179-ebbf-4e97-b4f6-7a1ea38ec633",
      "userName": "Test Tenant 21",
      "profileImage": null,
      "email": "tenant21@test.com",
      "phoneNumber": null,
      "occupation": null,
      "address": null,
      "role": "TENANT",
      "status": "BANNED",
      "createdAt": "2026-07-06T00:00:00.000Z",
      "updatedAt": "2026-07-07T00:00:00.000Z"
    }
  }
}
```

**Error Responses:**
- **500 Internal Server Error**: Missing required field: status
- **500 Internal Server Error**: Invalid status. Must be one of: ACTIVE, BANNED
- **500 Internal Server Error**: User not found
- **500 Internal Server Error**: You are not logged in. Please log in to access this resource.
- **500 Internal Server Error**: Forbidden. You don't have permission to access this resource.

### 3. Get All Rentals

- **Endpoint**: `/api/admin/rentals`
- **Method**: `GET`
- **Description**: Retrieves a list of all rental requests in the system. Accessible only to users with the `ADMIN` role.

**Request Headers:**

```text
Authorization: Bearer <accessToken>
```

**Success Response:**

- **Code:** `200 OK`
- **Content:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Rental requests fetched successfully!",
  "data": {
    "rentals": [
      {
        "requestId": "8e14e8d3-952c-4b51-bcc5-f0e6a0990712",
        "userId": "721d970e-0db5-4558-961f-64637ff562e7",
        "propertyId": "1aa97d7d-7ae0-4cf3-a6da-c42a68175c99",
        "message": "Hi, I am interested in Beautiful Townhouse. Is it available for a viewing?",
        "status": "PENDING",
        "createdAt": "2026-07-06T00:00:00.000Z",
        "updatedAt": "2026-07-06T00:00:00.000Z",
        "property": {
          "propertyId": "1aa97d7d-7ae0-4cf3-a6da-c42a68175c99",
          "userId": "869d3fcc-251e-4cbe-b65c-906f93d3d809",
          "categoryId": "b71b3783-cffc-4c0d-804c-9de182267bbe",
          "locationId": "3dca7a74-b521-4f33-87a4-0c2d2f3b8b1a",
          "propertyName": "Beautiful Townhouse in Cantonment #36",
          "price": 50000,
          "address": "123 Main St",
          "description": "Property description...",
          "isAvailable": true,
          "amenities": ["Wi-Fi", "Pool"],
          "vacantFrom": "2026-07-06T00:00:00.000Z",
          "images": ["image1.jpg"],
          "bedroomCount": 3,
          "squarefoot": 1500,
          "createdAt": "2026-07-07T00:00:00.000Z",
          "updatedAt": "2026-07-07T00:00:00.000Z"
        }
      }
    ]
  }
}
```

**Error Responses:**
- **500 Internal Server Error**: You are not logged in. Please log in to access this resource.
- **500 Internal Server Error**: Forbidden. You don't have permission to access this resource.

### 4. Create Category

- **Endpoint**: `/api/admin/categories`
- **Method**: `POST`
- **Description**: Creates a new property category. Accessible only to users with the `ADMIN` role.

**Request Headers:**

```text
Authorization: Bearer <accessToken>
```

**Request Body:**

```json
{
  "categoryName": "Penthouse"
}
```

**Success Response:**

- **Code:** `200 OK`
- **Content:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Category created successfully!",
  "data": {
    "category": {
      "categoryId": "52c8047b-3204-42bd-beb9-086ad889e613",
      "categoryName": "Penthouse",
      "createdAt": "2026-07-07T00:00:00.000Z",
      "updatedAt": "2026-07-07T00:00:00.000Z"
    }
  }
}
```

**Error Responses:**
- **500 Internal Server Error**: Category already exists
- **500 Internal Server Error**: You are not logged in. Please log in to access this resource.
- **500 Internal Server Error**: Forbidden. You don't have permission to access this resource.

## Tenant APIs

### 1. Create Rental Request

- **Endpoint**: `/api/requests`
- **Method**: `POST`
- **Description**: Creates a new rental request for a specific property. Accessible only to users with the `TENANT` role. Duplicate pending requests for the same property are not allowed.

**Request Headers:**

```text
Authorization: Bearer <accessToken>
```

**Request Body:**

```json
{
  "propertyId": "630123ff-65e7-459f-bbf3-663989daa7e7",
  "message": "Hello! I'd like to schedule a viewing."
}
```

**Success Response:**

- **Code:** `201 CREATED`
- **Content:**

```json
{
  "success": true,
  "statusCode": 201,
  "message": "Request created successfully",
  "data": {
    "requestId": "06db67b5-ba02-4fcc-845e-b37af99cd418",
    "userId": "7be45034-b9de-46ac-bfd1-77f81e437312",
    "propertyId": "630123ff-65e7-459f-bbf3-663989daa7e7",
    "message": "Hello! I'd like to schedule a viewing.",
    "status": "PENDING",
    "createdAt": "2026-07-07T00:00:00.000Z",
    "updatedAt": "2026-07-07T00:00:00.000Z"
  }
}
```

**Error Responses:**
- **500 Internal Server Error**: Missing required fields: propertyId and message are required
- **500 Internal Server Error**: Property not found
- **500 Internal Server Error**: You already have a pending request for this property
- **500 Internal Server Error**: You are not logged in. Please log in to access this resource.
- **500 Internal Server Error**: Forbidden. You don't have permission to access this resource.

### 2. Get All Rental Requests

- **Endpoint**: `/api/requests`
- **Method**: `GET`
- **Description**: Retrieves all rental requests made by the currently authenticated tenant. Accessible only to users with the `TENANT` role.

**Request Headers:**

```text
Authorization: Bearer <accessToken>
```

**Success Response:**

- **Code:** `200 OK`
- **Content:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Request fetched successfully",
  "data": [
    {
      "requestId": "e027643b-bfba-4364-a82e-7860ad5714ca",
      "userId": "7be45034-b9de-46ac-bfd1-77f81e437312",
      "propertyId": "b5946e1b-8519-4243-9fb0-965d2ece4625",
      "message": "Hi, I am interested in Beautiful Duplex in Baridhara #13. Is it available for a viewing?",
      "status": "PENDING",
      "createdAt": "2026-07-06T00:00:00.000Z",
      "updatedAt": "2026-07-06T00:00:00.000Z",
      "property": {
        "propertyId": "b5946e1b-8519-4243-9fb0-965d2ece4625",
        "propertyName": "Beautiful Duplex in Baridhara #13",
        "price": 36197
      }
    }
  ]
}
```

**Error Responses:**
- **500 Internal Server Error**: You are not logged in. Please log in to access this resource.
- **500 Internal Server Error**: Forbidden. You don't have permission to access this resource.

### 3. Get Rental Request by ID

- **Endpoint**: `/api/requests/:id`
- **Method**: `GET`
- **Description**: Retrieves a specific rental request made by the currently authenticated tenant. Accessible only to users with the `TENANT` role.

**Request Headers:**

```text
Authorization: Bearer <accessToken>
```

**Success Response:**

- **Code:** `200 OK`
- **Content:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Request fetched successfully",
  "data": {
    "requestId": "e027643b-bfba-4364-a82e-7860ad5714ca",
    "userId": "7be45034-b9de-46ac-bfd1-77f81e437312",
    "propertyId": "b5946e1b-8519-4243-9fb0-965d2ece4625",
    "message": "Hi, I am interested in Beautiful Duplex in Baridhara #13. Is it available for a viewing?",
    "status": "PENDING",
    "createdAt": "2026-07-06T00:00:00.000Z",
    "updatedAt": "2026-07-06T00:00:00.000Z",
    "property": {
      "propertyId": "b5946e1b-8519-4243-9fb0-965d2ece4625",
      "propertyName": "Beautiful Duplex in Baridhara #13",
      "price": 36197
    }
  }
}
```

**Error Responses:**
- **500 Internal Server Error**: Request not found
- **500 Internal Server Error**: You are not logged in. Please log in to access this resource.
- **500 Internal Server Error**: Forbidden. You don't have permission to access this resource.

## Public APIs

### 1. Get All Properties

- **Endpoint**: `/api/properties`
- **Method**: `GET`
- **Description**: Retrieves a paginated list of all properties. Supports advanced filtering, partial search, and sorting via query parameters.

**Query Parameters (All Optional):**
- `searchTerm`: Partial match for `propertyName`, `address`, `description`, or exact match in `amenities`
- `categoryName`: Filter by exact category name
- `locationName`: Filter by exact location name
- `minPrice` / `maxPrice`: Filter by price range
- `minBedrooms`: Filter by minimum number of bedrooms
- `minSquarefoot` / `maxSquarefoot`: Filter by square footage range
- `sortBy`: Field to sort by (default: `createdAt`)
- `sortOrder`: `asc` or `desc` (default: `desc`)
- `page`: Page number (default: `1`)
- `limit`: Number of items per page (default: `10`)

**Success Response:**

- **Code:** `200 OK`
- **Content:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Properties fetched successfully",
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 54,
    "totalPages": 6
  },
  "data": [
    {
      "propertyId": "5c9a99f8-7a8c-47c6-a616-28fdc5a0775f",
      "userId": "826f67a7-932f-4f54-b1a7-3cbbe74d952b",
      "categoryId": "3a8ffb09-f28c-419f-9b3f-5168f137d2e4",
      "locationId": "48e70093-7c46-44ad-ab76-c0e39411cb8f",
      "propertyName": "Luxury Apartment",
      "price": 50000,
      "address": "123 Main St",
      "description": "A beautiful place...",
      "isAvailable": true,
      "amenities": ["Wi-Fi", "Pool"],
      "vacantFrom": "2026-08-01T00:00:00.000Z",
      "images": ["img1.jpg"],
      "bedroomCount": 3,
      "squarefoot": 1500,
      "createdAt": "2026-07-07T00:00:00.000Z",
      "updatedAt": "2026-07-07T00:00:00.000Z",
      "category": {
        "categoryId": "3a8ffb09-f28c-419f-9b3f-5168f137d2e4",
        "categoryName": "Apartment",
        "createdAt": "2026-07-07T00:00:00.000Z",
        "updatedAt": "2026-07-07T00:00:00.000Z"
      },
      "location": {
        "locationId": "48e70093-7c46-44ad-ab76-c0e39411cb8f",
        "locationName": "Downtown",
        "createdAt": "2026-07-07T00:00:00.000Z",
        "updatedAt": "2026-07-07T00:00:00.000Z"
      }
    }
  ]
}
```

### 2. Get All Categories

- **Endpoint**: `/api/properties/category`
- **Method**: `GET`
- **Description**: Retrieves a list of all available property categories. Typically used for populating dropdowns on the frontend.

**Success Response:**

- **Code:** `200 OK`
- **Content:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Category fetched successfully",
  "data": [
    {
      "categoryId": "3a8ffb09-f28c-419f-9b3f-5168f137d2e4",
      "categoryName": "Apartment",
      "createdAt": "2026-07-06T00:00:00.000Z",
      "updatedAt": "2026-07-06T00:00:00.000Z"
    }
  ]
}
```

### 3. Get Single Property

- **Endpoint**: `/api/properties/:propertyId`
- **Method**: `GET`
- **Description**: Retrieves detailed information about a specific property by its ID, including its category, location, and safely selected landlord information (without exposing their password).

**Success Response:**

- **Code:** `200 OK`
- **Content:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Property fetched successfully",
  "data": {
    "propertyId": "5c9a99f8-7a8c-47c6-a616-28fdc5a0775f",
    "userId": "826f67a7-932f-4f54-b1a7-3cbbe74d952b",
    "categoryId": "3a8ffb09-f28c-419f-9b3f-5168f137d2e4",
    "locationId": "48e70093-7c46-44ad-ab76-c0e39411cb8f",
    "propertyName": "Luxury Apartment",
    "price": 50000,
    "address": "123 Main St",
    "description": "A beautiful place...",
    "isAvailable": true,
    "amenities": ["Wi-Fi", "Pool"],
    "vacantFrom": "2026-08-01T00:00:00.000Z",
    "images": ["img1.jpg"],
    "bedroomCount": 3,
    "squarefoot": 1500,
    "createdAt": "2026-07-07T00:00:00.000Z",
    "updatedAt": "2026-07-07T00:00:00.000Z",
    "category": {
      "categoryId": "3a8ffb09-f28c-419f-9b3f-5168f137d2e4",
      "categoryName": "Apartment",
      "createdAt": "2026-07-07T00:00:00.000Z",
      "updatedAt": "2026-07-07T00:00:00.000Z"
    },
    "location": {
      "locationId": "48e70093-7c46-44ad-ab76-c0e39411cb8f",
      "locationName": "Downtown",
      "createdAt": "2026-07-07T00:00:00.000Z",
      "updatedAt": "2026-07-07T00:00:00.000Z"
    },
    "user": {
      "userName": "Landlord Name",
      "email": "landlord@example.com",
      "profileImage": null
    }
  }
}
```

**Error Responses:**
- **500 Internal Server Error**: Property not found
