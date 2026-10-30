# Lab 2: SQLite database and CRUD routes

**Name:** Sahithi Bidararpu · **Registration Number:** 252U1R1034 · **Section:** CSE Core 2A

**Live link:** _paste your deployed URL here (or write why it could not be deployed)_

## How to run

1. Install dependencies:
   ```
   npm install
   ```
2. Start the server:
   ```
   npm start
   ```
   For auto-restart on every change use `npm run dev` (nodemon).
3. Environment variables: none are required. Optional `PORT` (default `3000`).
4. The database file `database.db` is included. To recreate it, run `sqlite3 database.db < schema.sql`.

## Endpoints

| Method | Path | Description |
|---|---|---|
| GET | /books/ | Get all books |
| GET | /books/:bookId/ | Get one book by id |
| POST | /books/ | Add a new book |
| PUT | /books/:bookId/ | Update an existing book |
| DELETE | /books/:bookId/ | Delete a book |

Request body for POST and PUT:
```json
{ "title": "Zero to One", "author": "Peter Thiel", "price": 400, "pages": 224 }
```

## Screenshots

### Server running with nodemon
![Server running](screenshots/server-running.png)

### Database view in SQLite CLI (initial rows)
![Initial database](screenshots/db-initial.png)

### GET /books/
![GET all books](screenshots/get-all.png)
![GET all books in browser](screenshots/get-all-browser.png)

### GET /books/:bookId/
![GET one book](screenshots/get-one.png)

### POST /books/
![POST book](screenshots/post-book.png)

### PUT /books/:bookId/
![PUT book](screenshots/put-book.png)

### DELETE /books/:bookId/
![DELETE book](screenshots/delete-book.png)

### Error case (404 book not found)
![Book not found](screenshots/get-not-found.png)

### Database after POST, PUT and DELETE
![Database after changes](screenshots/db-after-changes.png)

## Notes

-The first Render deploy crashed with "Exited with status 1". I fixed it by setting the Node version.
A wrong URL in Postman gave a 404. I corrected the URL.
I switched from a students table to the book table the lab asked for.