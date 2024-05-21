const express = require('express');
const PORT = process.env.PORT || 5000;
const session = require('express-session');
const MongoStore = require('connect-mongo');
const userRoutes = require('./routes/Users/usersRoute');
const propertyRoutes = require('./routes/Property/propertyRoute');
const sessionRoute = require('./routes/sessionRoute')
const cors = require('cors');
require('./config/dbConnect');

const app = express();

app.use(session({
    secret: 'anykey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/real-estate-app'
    })
}));

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'PUT'], 
    credentials: true 
}));

// Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/property', propertyRoutes);
app.use('/api/v1/session', sessionRoute);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
