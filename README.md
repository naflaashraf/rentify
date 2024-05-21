# Real Estate Application

## Table of Contents
- [Description](#description)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)

## Description
This is a full-stack MERN (MongoDB, Express.js, React, Node.js) application that allows users to register as either buyers or sellers. Sellers can post their properties for sale, and buyers can view and filter these properties. Buyers can also express interest in properties, allowing sellers to see which buyers are interested.

## Features

- User Authentication: Register and login functionality for both buyers and sellers.
- Seller Functionality: Post, update, and delete properties.
- Buyer Functionality: View all properties, filter properties based on various criteria, and express interest in properties.
- Session-Based Authentication: Uses session-based authentication for maintaining user sessions.

## Technologies Used

### Frontend

- React.js
- React Router
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation

1. Clone the repository:

```bash
git clone https://github.com/naflaashraf/rentify
```
2. Navigate to the project directory:

```bash
cd real-estate-app
```
3. Install dependencies for frontend and backend:

```bash
cd client
npm install
cd ../server
npm install
```
4. To run the project

```bash
# to run the server
npm start

# to run the client
npm start
```