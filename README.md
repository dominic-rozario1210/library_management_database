# Library Management System

A REST API built using Node.js, Express.js, MongoDB, and Mongoose to manage library books and their availability.

## Features

- Create and manage book records
- Store book title, author, and category
- Track total and available copies
- Validate book details using Mongoose schemas
- Automatically track creation and update timestamps

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/dominic-rozario1210/library_management_database
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   PORT=3000
   mongoDbConnectionString=YOUR_MONGODB_CONNECTION_STRING
   ```

4. Start the server:

   ```bash
   npm start
   ```

## Book Data Example

```json
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "category": "Fiction",
  "totalCopies": 10,
  "availableCopies": 10
}
```

## Future Enhancements

- Member management
- Book borrowing and returning
- Borrowing records and history

## Author

Dominic Rozario