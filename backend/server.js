const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Add this if it's missing!
app.get('/api/health', (req, res) => {
    res.json({ status: "success", message: "Backend is LIVE!" });
});

app.use('/api/runs', require('./src/routes/runRoutes'));

app.listen(5000, () => console.log('🚀 Backend running on http://localhost:5000'));