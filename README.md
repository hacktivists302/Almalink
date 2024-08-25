# AlmaLink

## Introduction
**AlmaLink** is a next-generation networking platform designed specifically for academic institutions. It provides a robust and user-friendly portal that allows universities to monitor their graduates and build a strong alumni network. By serving as a central hub for alumni interactions, AlmaLink facilitates connections between current students and alumni, offering support for self-employment, job opportunities, and industry networking.

## Features
- **Graduate Monitoring:** Track and maintain records of yearly graduates efficiently.
- **Alumni Network:** Establish and manage a strong alumni network, enabling ongoing interaction and support.
- **Student-Alumni Interaction:** Facilitate meaningful connections between current students and alumni for mentorship and career opportunities.
- **Job Opportunities:** Provide a platform for alumni to share job opportunities and support student employment.
- **User-Friendly Interface:** Clean and intuitive design using Tailwind CSS for seamless navigation.
- **Email Notifications:** Integrated email system using Nodemailer to keep users informed.
- **Real-time Updates:** WebSocket integration for real-time interaction and updates.

## Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Cloud Services:** Cloudinary (for image and file management)
- **HTTP Client:** Axios
- **Email Service:** Nodemailer
- **Real-time Communication:** WebSockets

## Dependencies
To run AlmaLink, ensure you have the following dependencies installed:
- Node.js (version 14.x or higher)
- npm (version 6.x or higher)
- MongoDB
- Cloudinary Account (for media management)
- WebSocket support

### Node.js Modules:
- `express`
- `mongoose`
- `axios`
- `nodemailer`
- `cloudinary`
- `cors`
- `dotenv`
- `websocket`
- `react`
- `react-dom`
- `react-router-dom`
- `redux`
- `redux-thunk`

## Installation

1. **Clone the repository:**
   ```bash
   https://github.com/hacktivists302/Almalink.git
   cd almalink


##Install Backend Dependencies:
```
cd server
npm install
```
   
##Install Frontend Dependencies:
```
cd ../client
npm install
```
## Set Up Environment Variables: Create a .env file in the server directory and add the following variables:
```
PORT=
MONGO_URI=
CORS_ORIGIN=
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```


##Start the Development Server:

#Backend
```
cd server
npm run dev
```

#Frontend
```
cd ../client
npm start
```



