# MERN URL Shortener

A simple yet powerful URL shortening application built with the MERN stack (MongoDB, Express, React, Node.js).

## Live Demo

**[https://mern-url-shortner-v81f.onrender.com/](https://mern-url-shortner-v81f.onrender.com/)**

## Features

- ✨ **Shorten Long URLs** - Convert lengthy URLs into short, shareable links
- 🎯 **Copy to Clipboard** - One-click copy functionality for shortened URLs
- 📱 **QR Code Generation** - Automatically generate QR codes for shortened URLs
- ⬇️ **Download QR Codes** - Download QR codes as PNG images
- 🎨 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 📌 **Demo URL** - Sample long URL provided for testing
- ⚡ **Real-time Updates** - See results instantly with Vite's hot module reloading

## Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Axios (HTTP client)
- react-qr-code & qrcode (QR code generation)

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose (ODM)
- Nanoid (unique ID generation)
- Nodemon (development server)

## Project Structure

```
MERN-URL-Shortner/
├── backend/
│   ├── models/
│   │   └── Url.js          # MongoDB Url schema
│   ├── routes/
│   │   └── url.js          # API routes
│   ├── server.js           # Express server setup
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main React component
│   │   ├── main.jsx        # React entry point
│   │   └── index.css       # Global styles
│   ├── index.html          # HTML template
│   ├── vite.config.js      # Vite configuration
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or cloud - Atlas recommended)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd MERN-URL-Shortner
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   ```

   Create a `.env.local` file in the frontend directory:
   ```env
   VITE_BACKEND_URL=http://localhost:5000/api
   ```

## Running the Application

### Development Mode

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
```
The backend will start on `http://localhost:5000`

**Terminal 2 - Frontend Server:**
```bash
cd frontend
npm run dev
```
The frontend will be available on `http://localhost:5173`

### Production Mode

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## API Endpoints

### POST /api/shorten
Shortens a given URL.

**Request:**
```json
{
  "originalUrl": "https://www.example.com/very-long-url"
}
```

**Response:**
```json
{
  "shortUrl": "http://localhost:5000/abc123",
  "originalUrl": "https://www.example.com/very-long-url",
  "_id": "mongo_id"
}
```

### GET /:shortId
Redirects to the original URL.

**Response:** Redirects to the original URL (HTTP 301/302)

## Usage

1. Visit the application
2. You'll see a demo URL - click "Copy Demo URL" to test with sample data
3. Or paste your own long URL in the input field
4. Click "Shorten URL" to generate a shortened link
5. The QR code will be automatically generated
6. Copy the shortened URL or download the QR code
7. Share your shortened URL!

## Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

**Backend:**
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env.local)
```env
VITE_BACKEND_URL=http://localhost:5000/api
```

## Deployment

This project is deployed on **Render**:
- **Frontend:** Deployed as a static site
- **Backend:** Deployed as a Node.js service

To deploy your own version:
1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables in Render dashboard
4. Deploy automatically on push

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## Author

Vijaya Bhaskar Velagana

## Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

**Happy URL Shortening! 🚀**
