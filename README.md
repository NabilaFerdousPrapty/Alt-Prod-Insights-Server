
# Alternative Product Insights Server

Alternative Product Insights is a web application designed to help users search and recommend alternative products. This server-side application is built using Node.js, Express, MongoDB, and JWT for authentication.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

To get started with the Alternative Product Insights server, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/altprodinsights-server.git
   cd altprodinsights-server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add your MongoDB credentials and other configuration details:
   ```
   PORT=5000
   DB_USER=your_db_user
   DB_PASS=your_db_password
   ACCESS_TOKEN_SECRET=your_access_token_secret
   NODE_ENV=development
   ```

## Configuration

The server configuration is managed through environment variables. Ensure you have the following variables set in your `.env` file:

- `PORT`: The port on which the server will run.
- `DB_USER`: Your MongoDB username.
- `DB_PASS`: Your MongoDB password.
- `ACCESS_TOKEN_SECRET`: The secret key for JWT token signing.
- `NODE_ENV`: The environment mode (development or production).

## API Endpoints

### Authentication

#### Generate JWT
- **Endpoint:** `POST /jwt`
- **Description:** Generate a JWT token for a user.
- **Request Body:**
  ```json
  {
    "email": "user@example.com"
  }
  ```

#### Logout
- **Endpoint:** `GET /logout`
- **Description:** Clear the JWT token from cookies.

### Queries

#### Add a Query
- **Endpoint:** `POST /queries`
- **Description:** Add a new query.
- **Request Body:**
  ```json
  {
    "productName": "string",
    "productBrand": "string",
    "productImageUrl": "string",
    "queryTitle": "string",
    "buyingReasonDetails": "string",
    "email": "string"
  }
  ```

#### Get All Queries
- **Endpoint:** `GET /queries`
- **Description:** Retrieve all queries.

#### Get Queries by Email
- **Endpoint:** `GET /queriess/:email`
- **Description:** Retrieve queries by user email.
- **URL Parameters:** `email` - User's email.

#### Get Single Query
- **Endpoint:** `GET /queries/:id`
- **Description:** Retrieve a single query by ID.
- **URL Parameters:** `id` - Query ID.

#### Update a Query
- **Endpoint:** `PATCH /myQueries/update/:id`
- **Description:** Update details of a query.
- **URL Parameters:** `id` - Query ID.
- **Request Body:** Same as Add a Query.

#### Delete a Query
- **Endpoint:** `DELETE /myQueries/delete/:id`
- **Description:** Delete a query by ID.
- **URL Parameters:** `id` - Query ID.

### Recommendations

#### Add a Recommendation
- **Endpoint:** `POST /recommendations`
- **Description:** Add a new recommendation.
- **Request Body:**
  ```json
  {
    "queryId": "string",
    "recommendationDetails": "string",
    "RecommenderEmail": "string"
  }
  ```

#### Get All Recommendations
- **Endpoint:** `GET /recommendations`
- **Description:** Retrieve all recommendations.

#### Get Recommendations by Email
- **Endpoint:** `GET /recommendations/:email`
- **Description:** Retrieve recommendations by recommender's email.
- **URL Parameters:** `email` - Recommender's email.

#### Delete a Recommendation
- **Endpoint:** `DELETE /recommendations/delete/:id`
- **Description:** Delete a recommendation by ID.
- **URL Parameters:** `id` - Recommendation ID.

#### Get Recommendations for User
- **Endpoint:** `GET /ForMeRecommendations/:email`
- **Description:** Retrieve recommendations for a specific user.
- **URL Parameters:** `email` - User's email.

#### Get Recommendations for a Query
- **Endpoint:** `GET /allRecommendations/:id`
- **Description:** Retrieve recommendations for a specific query.
- **URL Parameters:** `id` - Query ID.

## Usage

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Access the server:**
   Open your browser and navigate to `http://localhost:5000`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or new features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```

Feel free to customize this `README.md` file as per your specific requirements and add any additional information as needed.