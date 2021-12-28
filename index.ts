import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (height === '' || weight === '') {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const heightNumber: number = Number(height);
  const weightNumber: number = Number(weight);
  if (isNaN(heightNumber) || isNaN(weightNumber)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(heightNumber, weightNumber);
  return res.json({
    weight: weightNumber,
    height: heightNumber,
    bmi,
  });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
