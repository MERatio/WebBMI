import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  if (height === '' || weight === '') {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const heightNumber = Number(height);
  const weightNumber = Number(weight);
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

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  const numberTarget = Number(target);

  if (target === '' || isNaN(numberTarget)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const doesHoursHaveEmptyString: boolean = daily_exercises.some(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (hour: any) => hour === ''
  );

  if (doesHoursHaveEmptyString) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const numberHours: Array<number> = daily_exercises.map((hour: any) =>
    Number(hour)
  );
  const doesHoursHaveNaN: boolean = numberHours.some((numberHour) =>
    isNaN(numberHour)
  );

  if (doesHoursHaveNaN) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const exercises = calculateExercises(daily_exercises, target);
  return res.json(exercises);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
