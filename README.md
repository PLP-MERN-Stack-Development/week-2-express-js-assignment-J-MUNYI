# 🧠 Express.js API Assignment

This project is a RESTful API built with **Node.js** and **Express.js**.  
It manages a list of products and supports features like filtering, pagination, authentication, validation, search, and error handling.

---

## How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/J-MUNYI/WEEK-2-EXPRESS-JS-ASSIGNMENT.git
cd J-MUNYI/WEEK-2-EXPRESS-JS-ASSIGNMENT
2. Install Dependencies
bash
Copy
Edit
npm install
3. Set Up Environment Variables
Create a .env file in the root folder. Use .env.example as reference:

ini
Copy
Edit
PORT=3000
API_KEY=54321
4. Start the Server
bash
Copy
Edit
node index.js
Server will run on:

arduino
Copy
Edit
http://localhost:3000
 API Endpoints Documentation
 GET /api/products
List all products, with optional filtering and pagination.

Query Parameters:

category – filter by product category (optional)

page – page number (optional)

limit – number of results per page (optional)

Example:

http
Copy
Edit
GET /api/products?category=Electronics&page=1&limit=5
    GET /api/products/:id
Fetch a single product by ID.

http
Copy
Edit
GET /api/products/2
    POST /api/products
Create a new product.

Headers:

makefile
Copy
Edit
x-api-key: 54321
Request Body:

json
Copy
Edit
{
  "name": "Moringa Oil",
  "description": "Organic hair and skin oil",
  "price": 200,
  "category": "Health and Beauty",
  "inStock": true
}
     PUT /api/products/:id
Update an existing product by ID.

Headers:

makefile
Copy
Edit
x-api-key: 54321
Request Body: (Same format as POST)

    DELETE /api/products/:id
Delete a product by ID.

Headers:

makefile
Copy
Edit
x-api-key: 54321
     GET /api/products/search
Search for products by name.

http
Copy
Edit
GET /api/products/search?name=oil
      GET /api/products/stats
Returns total products and count by category.

http
Copy
Edit
GET /api/products/stats
Middleware Used
Logger – logs request method, URL, and timestamp

Authentication – checks x-api-key header

Validation – ensures correct data types and required fields for product creation/update

404 Handler – responds to unknown routes

Global Error Handler – catches and formats all thrown errors

Tech Stack
Node.js

Express.js

Environment Variables
Create a .env file using the format below:

env
Copy
Edit
PORT=3000
API_KEY=54321
You can find an example in the .env.example file.

File Structure
Since this is a simple project, all logic is inside index.js:

pgsql
Copy
Edit
├── index.js
├── package.json
├── .env.example
├── README.md
