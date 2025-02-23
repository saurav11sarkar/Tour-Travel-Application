```markdown
# Tour-Travel Application Server Documentation

Welcome to the **Tour Travel Application**! This application is designed to manage tours, bookings, users, and authentication for a travel agency. It provides a robust backend system built with **Node.js**, **Express**, and **MongoDB**.

## Features

- **User Management**: Create, read, update, and delete users. Users can have roles like `admin` or `user`.
- **Tour Management**: Manage tours with details like name, duration, price, start dates, and locations.
- **Booking Management**: Handle bookings for tours, including booking status and total price calculation.
- **Authentication & Authorization**: Secure routes with JWT-based authentication and role-based access control.
- **Email Notifications**: Send emails for password reset and other notifications using **Nodemailer**.
- **Error Handling**: Comprehensive error handling for database operations, validation, and authentication.
- **Pagination, Sorting, and Filtering**: Advanced querying capabilities for tours and bookings.

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: MongoDB (with Mongoose for schema modeling)
- **Authentication**: JSON Web Tokens (JWT)
- **Email Service**: Nodemailer
- **Error Handling**: Custom error handlers for MongoDB, Zod, and generic errors
- **Environment Management**: Dotenv for environment variables
- **API Testing**: Postman or any REST client

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (either locally or a cloud instance like MongoDB Atlas)
- NPM or Yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/tour-travel-app.git
   cd tour-travel-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     NODE_ENV=development
     PORT=4000
     DB_URL=mongodb+srv://your-db-connection-string
     BCRYPT_SALT_ROUND=10
     JWT_SECRET_KEY=your-secret-key
     ```

4. **Run the application**:
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Access the API**:
   - The API will be running at `http://localhost:4000`.
   - Use tools like **Postman** or **Insomnia** to interact with the API.

## API Endpoints

### Authentication
- **POST /api/v1/auths/register**: Register a new user.
- **POST /api/v1/auths/login**: Login and get a JWT token.
- **POST /api/v1/auths/forget-password**: Request a password reset link.
- **POST /api/v1/auths/reset-password**: Reset the password using a token.

### Users
- **POST /api/v1/users/create-admin**: Create an admin user (admin role required).
- **GET /api/v1/users**: Get all users (admin/user role required).
- **GET /api/v1/users/:id**: Get a single user by ID.
- **PATCH /api/v1/users/:id**: Update a user by ID.
- **DELETE /api/v1/users/:id**: Delete a user by ID.

### Tours
- **POST /api/v1/tours/create-tour**: Create a new tour.
- **GET /api/v1/tours**: Get all tours with pagination, sorting, and filtering.
- **GET /api/v1/tours/:id**: Get a single tour by ID.
- **GET /api/v1/tours/schedule/:id**: Get the next scheduled date for a tour.
- **PATCH /api/v1/tours/:id**: Update a tour by ID.
- **DELETE /api/v1/tours/:id**: Delete a tour by ID.

### Bookings
- **POST /api/v1/bookings/create-booking**: Create a new booking.
- **GET /api/v1/bookings**: Get all bookings.
- **GET /api/v1/bookings/:id**: Get a single booking by ID.
- **PATCH /api/v1/bookings/:id**: Update a booking by ID.
- **DELETE /api/v1/bookings/:id**: Delete a booking by ID.

## Error Handling

The application uses a global error handler to manage different types of errors:
- **Mongoose CastError**: Handles invalid MongoDB ObjectIDs.
- **Duplicate Key Error**: Handles duplicate entries in the database.
- **Validation Error**: Handles schema validation errors.
- **Zod Error**: Handles request body validation errors.
- **Generic Error**: Handles all other types of errors.

## Live Deployment

The application is deployed and can be accessed live at:  
🌐 [Live Server Deployment](https://your-live-server-link.com)

## GitHub Repository

You can find the source code for this project on GitHub:  
📂 [GitHub Repository](https://github.com/your-username/tour-travel-app)

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Push your branch and open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or need further assistance, feel free to reach out:
- **Email**: your-email@example.com
- **GitHub**: [your-username](https://github.com/your-username)




### Changes Made:
1. Added **Live Deployment Link** under the **Live Deployment** section.
2. Added **GitHub Repository Link** under the **GitHub Repository** section.
3. Both links are clearly labeled and easy to find.

Replace the placeholders (`https://tour-traval.vercel.app/` and `https://github.com/your-username/tour-travel-app`) with your actual deployment and repository URLs. This will make it easy for users to access the live server and explore the codebase.

### Example User Object

````json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "image": "https://example.com/john-doe.jpg",
  "role": "user",
  "status": "active"
}

## Tour Model

The `Tour` model represents a travel package or destination offered by the application. It contains the following attributes:

### Attributes
- **name**: The name of the tour (e.g., "Explore the Himalayas").
- **duration**: The duration of the tour (e.g., "7 days", "2 weeks").
- **ratting**: The average rating of the tour (e.g., 4.5).
- **price**: The price of the tour (e.g., 1200).
- **coverImage**: The main image representing the tour (URL or file path).
- **image[]**: An array of additional images for the tour.
- **stateDate**: The start date of the tour (e.g., "2023-11-15").
- **tourLocation**: The location or destination of the tour (e.g., "Nepal").

### Example Tour Object
```json
{
  "name": "Explore the Himalayas",
  "duration": "10 days",
  "ratting": 4.7,
  "price": 1200,
  "coverImage": "https://example.com/himalayas-cover.jpg",
  "image": [
    "https://example.com/himalayas-1.jpg",
    "https://example.com/himalayas-2.jpg"
  ],
  "stateDate": "2023-11-15",
  "tourLocation": "Nepal"
}

# booking Model Documentation

The `booking` model represents feedback provided by users for specific tours in the Tour-Travel Application. This document provides detailed information about the model's attributes, relationships, and example data structures.

---

## Attributes

The `booking` model contains the following attributes:

- **booking**: The textual feedback provided by the user.
- **ratting**: The rating given by the user (e.g., 5).
- **tour**: A reference to the `Tour` being bookinged (linked by `Tour ID`).
- **user**: A reference to the `User` who wrote the booking (linked by `User ID`).

---

## Relationships

- A `booking` belongs to a single `Tour`.
- A `booking` belongs to a single `User`.
- A `Tour` can have multiple `booking`s.
- A `User` can write multiple `booking`s for different tours.

---

## Database Schema

The schema for the `booking` collection in the database is as follows:

```json
{
  "booking": "string",
  "ratting": "number",
  "tour": "ObjectId", // Reference to the Tour collection
  "user": "ObjectId" // Reference to the User collection
}

---

Thank you for using the **Tour Travel Application**! Happy coding! 🚀
````
