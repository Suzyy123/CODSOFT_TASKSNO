taskkill /F /IM node.exe (You may have an old server already running on port 5000 from another project.)

# Library Management System API (Backend)

# 1. Overview

The Library Management System API is a RESTful backend application developed using **Node.js**, **Express.js**, **Prisma ORM**, **PostgreSQL**, and **Zod**.

It allows users to manage authors, books, members, and book borrowing operations through REST APIs. The system supports CRUD operations, book issuing and returning, availability tracking, searching, filtering, pagination, overdue book detection, and late fee calculation.

This project was completed as **Task 4** for the **CodSoft Backend Development Internship**.

---

# 2. Features

## Author Management

- Create Author
- Get All Authors
- Get Author by ID
- Update Author
- Delete Author

## Book Management

- Create Book
- Get All Books
- Get Book by ID
- Update Book
- Delete Book
- Search Books
- Filter Books
- Pagination

## Member Management

- Create Member
- Get All Members
- Get Member by ID
- Update Member
- Delete Member
- Search Members
- Filter Members
- Pagination

## Issue Books

-  Create Issue Book
- Get all issued books
- Get all issued book by id
- Return Book
- Track Available Copies
- Prevent Duplicate Book Issues

## report
- get all library reports


## Bonus Features

- Overdue Book Detection
- Overdue Days Calculation
- Late Fee Calculation

## Validation

- Zod Validation
- Duplicate Email Validation
- Proper Error Handling

---

# 3. Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Zod
- dotenv
- CORS
- Nodemon
- Postman (API Testing)

---

# 4. Project Structure

```text
Task4-Library_Management_express
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authorController.js
│   │   ├── bookController.js
│   │   ├── memberController.js
│   │   ├── issuedBookController.js
│   │   └── reportController.js
│   │
│   ├── middleware/
│   │   ├── authorValidation.js
│   │   ├── bookValidation.js
│   │   ├── memberValidation.js
│   │   └── issuedBookValidation.js
│   │
│   ├── routes/
│   │   ├── authorRoutes.js
│   │   ├── bookRoutes.js
│   │   ├── memberRoutes.js
│   │   ├── issuedBookRoutes.js
│   │   └── reportRoutes.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

# 5. Installation

## 1. Clone the repository

```bash
git clone https://github.com/surakshyamagar/CODSOFT_TASKSNO.git
```

## 2. Move into the project

```bash
cd Task4-Library_Management_express
```

## 3. Install dependencies

```bash
npm install
```

## 4. Configure the .env file

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/librarydb"
PORT=5000
```

## 5. Generate Prisma Client

```bash
npx prisma generate
```

## 6. Run Database Migrations

```bash
npx prisma migrate dev
```

## 7. Start the Server

Development Mode

```bash
npm run dev
```

Production Mode

```bash
npm start
```

The server runs at

```
http://localhost:5000
```

---

# 6. Database Models

## Author

- id
- name
- bio
- createdAt

---

## Book

- id
- title
- isbn
- publishedYear
- totalCopies
- availableCopies
- authorId

---

## Member

- id
- name
- email
- phone

---

## Issued Book

- id
- issuedAt
- dueDate
- returnedAt
- status
- memberId
- bookId

---

# 7. API Endpoints

## Authors

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /authors | Create Author |
| GET | /authors | Get All Authors |
| GET | /authors/:id | Get Author by ID |
| PUT | /authors/:id | Update Author |
| DELETE | /authors/:id | Delete Author |

---

## Books

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /books | Create Book |
| GET | /books | Get All Books |
| GET | /books/:id | Get Book by ID |
| PUT | /books/:id | Update Book |
| DELETE | /books/:id | Delete Book |


### Filter

```
GET /books/filter?authorId=1
```

### Pagination

```
GET /books/pagination?page=1&limit=5
```

---

## Members

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /members | Create Member |
| GET | /members | Get All Members |
| GET | /members/:id | Get Member by ID |
| PUT | /members/:id | Update Member |
| DELETE | /members/:id | Delete Member |

### Search

```
GET /members/search?search=John
```

### Filter

```
GET /members/filter?hasIssuedBooks=true
```

### Pagination

```
GET /members/paginate?page=1&limit=5
```

---

## Issued Books

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/issued-books | Issue Book |
| GET | /api/issued-books | Get All Issued Books |
| GET | /api/issued-books/:id | Get Issued Book by ID |
| PUT | /api/issued-books/:id/return | Return Book |
| GET | /api/issued-books/overdue | Get Overdue Books |

---

## Reports

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /reports | All librray reports |

---

# 8. Business Rules

The system validates the following rules:

- Book must exist before issuing.
- Member must exist before issuing.
- Book must have available copies.
- A member cannot issue the same book twice without returning it.
- Returning a book automatically increases available copies.
- Duplicate member emails are not allowed.
- ISBN must contain exactly 13 digits.
- All request data is validated using Zod.

---

# 9. HTTP Status Codes

| Status Code | Meaning |
|-------------|---------|
| 200 | Success |
| 201 | Resource Created |
| 400 | Bad Request |
| 404 | Resource Not Found |
| 500 | Internal Server Error |

---

# 10. Testing

All API endpoints were tested successfully using **Postman**.

Tested Features

- Author CRUD
- Book CRUD
- Member CRUD
- Book Issue
- Book Return
- Search
- Filter
- Pagination
- Overdue Book Detection
- Late Fee Calculation
- Validation

---

# 11. Postman Collection

All API endpoints were tested using **Postman**.

The exported Postman Collection is available in the repository.

```text
Postman/
└── CodSoft.postman_collection.json
```

---

# 12. Learning Outcomes

Through this project, I learned:

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- CRUD Operations
- Database Relationships
- REST API Development
- Request Validation using Zod
- Search, Filtering, and Pagination
- Business Logic Implementation
- Overdue Book Detection
- Late Fee Calculation
- API Testing with Postman

---

Backend Development Internship – CodSoft