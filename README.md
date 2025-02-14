```markdown
# Product API

A RESTful API built with Node.js, Express, and MongoDB (via Mongoose) to query products with advanced filtering, sorting, field selection, and pagination. This API demonstrates how to implement both dynamic queries and a static query for fetching product data.

## Features

- #Dynamic Querying:  
  Filter products based on:
  - Boolean fields (e.g., `feature`)
  - String matching (e.g., `company` and `name`)
  - Numeric filtering (e.g., `price` and `rating` using operators such as `>`, `>=`, `<`, `<=`, `=`)

- #Sorting & Field Selection:  
  Sort results by one or multiple fields and select specific fields to return.

- #Pagination: 
  Efficiently paginate through large datasets with customizable page and limit parameters.

- #Static Query Endpoint: 
  A simple endpoint to return a static set of product fields (name and price).

## API Endpoints

### GET `/api/v1/products`
Returns a list of products based on provided query parameters.

#**Query Parameters:**

- #**feature**: `true` or `false`
- #**company**: Company name (exact match)
- #**name**: Partial or complete name (case-insensitive)
- #**sort**: Comma-separated list of fields to sort by (e.g., `price,rating`)
- #**fields**: Comma-separated list of fields to include in the response (e.g., `name,price`)
- #**numericFilters**: Numeric filters for fields such as price and rating. Format example:  
  `numericFilters=price>100,rating>=4`
- #**page**: Page number (default: `1`)
- #**limit**: Number of results per page (default: `10`)

### GET `/api/v1/products/static`
Returns a static list of products with only the `name` and `price` fields.

## Project Structure

```
.
├── controllers
│   └── productsControllers.js    # Contains the logic for dynamic and static product queries
├── models
│   └── productModel.js           # Mongoose model for Product
├── routes
│   └── productsRouter.js         # Express router for product endpoints
├── app.js                        # Entry point of the application
├── package.json                  # Project dependencies and scripts
└── README.md                     # Project documentation
```

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/product-api.git
   cd product-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment:**

   Create a `.env` file in the root directory and add your MongoDB connection string along with any other configuration variables:

   ```env
   MONGO_URI=mongodb://localhost:27017/productsDB
   PORT=3000
   ```

## Running the Application

Start the server with:

```bash
npm start
```

For development with auto-reload (using nodemon):

```bash
npm run dev
```

The API will be available at [http://localhost:3000](http://localhost:3000) or the port specified in your `.env` file.

## Example Requests

### Dynamic Query Example

Fetch products from a specific company that have a price greater than 100 and a rating of at least 4, sorted by price, returning only the `name` and `price` fields:

```
GET /api/v1/products?company=Apple&numericFilters=price>100,rating>=4&sort=price&fields=name,price
```

### Static Query Example

Fetch all products with only the `name` and `price` fields:

```
GET /api/v1/products/static
```

## Contributing

Contributions are welcome! Please fork the repository and open a pull request with your changes. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the [MIT License](LICENSE).

