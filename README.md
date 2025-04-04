# Hotel Listing Application

A full-stack web application for managing hotel listings with CRUD operations.

## Features

- View all hotel listings
- Add new hotel listings
- Edit existing hotel listings
- Delete hotel listings
- Detailed view of individual hotels
- Input validation using Joi
- Error handling middleware
- MongoDB database integration
- EJS templating for server-side rendering

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Frontend**: EJS templates
- **Validation**: Joi
- **Environment**: dotenv
- **Development**: nodemon

## API Endpoints

- `GET /home` - Home page with featured listings
- `GET /listing` - View all hotel listings
- `GET /listing/new` - Form to create new listing
- `POST /listing` - Create new hotel listing
- `GET /listing/:id` - View specific hotel details
- `GET /listing/:id/edit` - Edit form for specific hotel
- `PUT /listing/:id` - Update hotel listing
- `DELETE /listing/:id/delete` - Delete hotel listing

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with:
```
MONGO_URI=your_mongodb_connection_string
PORT=8000
```

3. Start the development server:
```bash
npm run dev
```

4. Access the application at `http://localhost:8000/home`

## Project Structure

```
hotel-listing/
├── models/         # Database models (listings.js, home.js)
├── public/         # Static assets
├── utlis/          # Utility functions (wrapAsync, ExpressError)
├── views/          # EJS templates
│   └── listing/    # Hotel listing views
├── schema.js       # Joi validation schemas
└── app.js          # Main application file
```

## Error Handling

The application includes custom error handling for:
- 404 Not Found errors
- Input validation errors
- Database operation errors

## Development

The application uses nodemon for automatic server restarts during development. Run `npm run dev` to start the development server.

## Contributing

We welcome contributions to this project! Here's how you can help:

1. **Fork the Repository**
   - Click the 'Fork' button on the top right of the repository page
   - This creates a copy of the project in your GitHub account

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/your-username/hotel-listing.git
   cd hotel-listing
   ```

3. **Create a New Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes**
   - Follow the existing code style
   - Add comments where necessary
   - Update documentation if needed

5. **Test Your Changes**
   - Ensure all existing tests pass
   - Add new tests for your features
   - Test the application locally

6. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

7. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request**
   - Go to the original repository
   - Click 'New Pull Request'
   - Select your branch
   - Add a clear description of your changes
   - Submit the pull request

### Guidelines for Contributors

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Keep pull requests focused on a single feature or fix
- Update documentation as needed
- Be responsive to feedback and review comments

### Reporting Issues

If you find a bug or have a feature request:
1. Check if the issue already exists
2. Create a new issue with a clear title and description
3. Include steps to reproduce if it's a bug
4. Add relevant screenshots or error messages
