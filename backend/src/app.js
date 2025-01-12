const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));

app.use(express.json());

// ...existing code...
