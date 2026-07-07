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
