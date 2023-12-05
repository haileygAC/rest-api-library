# RESTFul APIs with Node and Express (Library)

### Introduction

In this lab, you will develop a library catalog API where you can manage a collection of books. 

### Learning Objectives

Students should get **hands-on experience** with:

- Understanding REST Principles: 
 - Define the principles of Representational State Transfer (REST).
 - Identify resources in the context of the library catalog (e.g., books).
- HTTP Methods and CRUD Operations:
 - Differentiate between various HTTP methods (GET, POST, PUT, DELETE) and associate each with its corresponding CRUD operation.
 - Understand how CRUD operations apply to managing books in a library catalog.
- Resource Design and URI Structure:
 - Design resources for the library catalog, such as books.
 - Construct meaningful URIs for the resources.
- HTTP Status Codes:
 - Understand the significance of common HTTP status codes (e.g., 200 OK, 201 Created, 204 No Content, 400 Bad Request, 404 Not Found) in the context of managing library catalog resources.
- Request and Response Handling:
 - Recognize the components of an HTTP request (headers, parameters) and response (headers, status code, body).
 - Understand how to handle requests and responses for book-related operations.

### Setup For This Lab

Follow the below steps and you'll be ready to get going on the lab!

1. In the terminal, navigate into the lab's root directory. Be sure you're not in any sub-directory. You want to be in `rest-api-library`.
2. Still in the terminal, run `npm init -y` to initialize the package.json.
3. Follow the steps to set up your project.
4. Run the following command, `npm install express` to add Express.
5. Create a folder named `src` and within that, create file named `app.js`
6. Still in the terminal, cd into your src folder and run `node app.js`. (See the below "Starting Point" section.)

### General Lab Workflow

1. Add the next required feature of your assignment. Example: the ability of your web server to handle a request to read all notes.
2. Re-run your `node` command to restart the web server with your changes (you can skip this if you're using `node --watch`) You can quit your current `node` command (or any long-running command in the terminal) using **Control-c**.
3. Using Postman, test the URL of the feature you're working on to see if it works.
   - Make sure you're adding any necessary data to the request body.
   - Make sure you're using "http" and not "https" in your URL.
4. Repeat 1-3 until your feature is working.
5. Repeat 1-4 until you're done with the assignment.

### Starting Point

Look through the directory at all the files and make sure you understand their purpose. Ask questions if the below summary isn't clear!

- `data/books.json` has the books for you to start with.
- `data/backup-books.json` has backups of the books, so that if you delete all the books during testing, you can copy them back over manually. **NOTE**: do not change the backup file itself, or you'll have to re-download it.

### Data Shape

Check out the data in `data/books.json` to see what that looks like.

### Specifications For This Lab

If you successfully implement all the following features, you will have a fully functional web server and be done with this lab.

Your app should do the following:
- Get all books
- Create a new book
- Retreieve a specific book by ID
- Update a book
- Delete a book by ID

### Testing

Open your web browser and visit http://localhost:3000/books to view the list of books.

Use a tool like Postman to interact with the API:

- GET /books: Retrieve all books.
- POST /books: Create a new book. Send a JSON payload like {"title": "1984", "author": "George Orwell"}.
- GET /books/:id: Retrieve a specific book by ID.
- PUT /books/:id: Update a book by ID. Send a JSON payload with the fields to update.
- DELETE /books/:id: Delete a book by ID.


### Bonus
- Add more features to the library catalog, such as tracking borrowing status, publication dates, or genres.
