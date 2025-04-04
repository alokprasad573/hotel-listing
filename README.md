# Hotel Listing Application

A web application for managing and displaying hotel listings, built with Node.js, Express, and MongoDB.

## Features

- Hotel listing management
- User-friendly interface
- Database integration with MongoDB
- Environment variable configuration
- Server-side rendering with EJS templates

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Template Engine**: EJS with EJS-Mate
- **Validation**: Joi
- **Environment Management**: dotenv

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hotel-listing
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
PORT=3000
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
hotel-listing/
├── init/           # Initialization scripts
├── models/         # Database models
├── public/         # Static assets
├── utlis/          # Utility functions
├── views/          # EJS templates
├── app.js          # Main application file
├── schema.js       # Database schemas
└── package.json    # Project dependencies
```

## Development

The application uses nodemon for development, which automatically restarts the server when changes are detected.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
