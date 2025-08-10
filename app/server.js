const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 80;

app.use(morgan('dev'));

// Utility function to safely parse query numbers
function parseNumber(value) {
  const num = parseFloat(value);
  if (isNaN(num)) throw new Error(`Invalid number: ${value}`);
  return num;
}

// Routes
app.get('/add', (req, res) => {
  try {
    const a = parseNumber(req.query.a);
    const b = parseNumber(req.query.b);
    res.json({ result: a + b });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/subtract', (req, res) => {
  try {
    const a = parseNumber(req.query.a);
    const b = parseNumber(req.query.b);
    res.json({ result: a - b });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/multiply', (req, res) => {
  try {
    const a = parseNumber(req.query.a);
    const b = parseNumber(req.query.b);
    res.json({ result: a * b });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/divide', (req, res) => {
  try {
    const a = parseNumber(req.query.a);
    const b = parseNumber(req.query.b);
    if (b === 0) throw new Error("Division by zero is not allowed.");
    res.json({ result: a / b });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: "ok", service: "math-api", time: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Math API is running on port ${PORT}`);
});
