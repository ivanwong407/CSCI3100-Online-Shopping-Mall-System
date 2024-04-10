require('dotenv').config();
const express = require('express');
const dbConnect = require('./utils/dbConnect');
const userRoutes = require('./routes/userRoutes');

dbConnect();

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));