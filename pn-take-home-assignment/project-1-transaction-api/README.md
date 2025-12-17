# Transaction API

## Setup Instructions

1. Ensure you have Node.js (version 18 or higher) and npm installed.

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up MongoDB:
   - Install MongoDB locally or use a cloud service like MongoDB Atlas.
   - Set the `MONGO_URI` environment variable to your MongoDB connection string (default: `mongodb://localhost:27017/finance`).

4. Run the application:
   ```bash
   # Development mode with hot reload
   npm run start:dev
   ```

   The API will be available at `http://localhost:3000/api`.

5. API Documentation:
   - Swagger UI: `http://localhost:3000/api/docs`

## Design Decisions

- **Framework**: Chose NestJS for its modular architecture, dependency injection, and built-in support for TypeScript, which promotes maintainable and scalable code.

- **Database**: Used MongoDB with Mongoose for its flexibility with schema-less documents, suitable for transaction data that might evolve. Trade-off: NoSQL vs SQL - chose NoSQL for easier scaling and handling of variable data structures, but it lacks ACID transactions for complex operations.

- **Soft Deletes**: Implemented soft deletes by adding a `deletedAt` field instead of hard deleting records, allowing for data recovery and audit trails. Trade-off: Increases storage but provides better data integrity.

- **Validation**: Used class-validator for DTOs to ensure input validation at the application level. Trade-off: Adds overhead but prevents invalid data from reaching the database.

- **API Design**: RESTful endpoints with global prefix `/api`. Included query parameters for filtering (e.g., by type, include deleted). Trade-off: Simple and standard, but could be enhanced with GraphQL for more flexible queries.

- **Testing**: Basic unit and e2e tests with Jest. Trade-off: Minimal coverage for demonstration, but production would require more comprehensive tests.

## What You'd Improve

- **Authentication and Authorization**: Add JWT-based auth to secure endpoints, with role-based access control.

- **Error Handling**: Implement global exception filters and better error responses.

- **Pagination**: Add pagination to the list transactions endpoint for large datasets.

- **Caching**: Integrate Redis for caching frequent queries to improve performance.

- **Logging**: Add structured logging with Winston for better monitoring and debugging.

- **Deployment**: Set up Docker containerization and CI/CD pipeline for automated deployment.

- **Testing**: Increase test coverage, including integration tests and API contract tests.

- **Documentation**: Expand API docs with examples and add OpenAPI spec export.

- **Security**: Add rate limiting, input sanitization, and HTTPS enforcement.
