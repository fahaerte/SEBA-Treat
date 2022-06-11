# Backend

Authentication and user management service for Treat

Run `yarn start` to start the server on [http://localhost:5000]().

## Swagger

- To test endpoints
- Make server requests
- Like postman
- Documentation of API
  [http://localhost:5000/api-docs]()

## File Structure:

- Controller: controllers for each component, executing business logic and DB functions
- Loader: all functionalities and configs that are executed during application startup
- Middleware: For data validation with Joi, ensures that in/output follows defined collection scheme
- Models: definition of all collection models and schemas
- Routes: Routing, there the underlying functionalities from the controller are called
