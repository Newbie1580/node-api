require('dotenv').config();
const express = require('express');
const { requestLogger } = require('./middlewares/authMiddleware');
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(requestLogger);

// Mount Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Centralized Error-Handling Middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});