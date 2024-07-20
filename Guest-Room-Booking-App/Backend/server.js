const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/users');
const propertyRoutes = require('./routes/properties');
const roomRoutes = require('./routes/rooms');

app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/rooms', roomRoutes);

// Connect to MongoDB
mongoose.connect('mongodb+srv://venkatesh:9865271790a@venkatcluster.jw7fata.mongodb.net/?retryWrites=true&w=majority&appName=venkatcluster', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
