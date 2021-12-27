const calculateBMI = (heightCm: number, weightKg: number): string => {
	const meter: number = heightCm / 100;
	const bmi: number = weightKg / Math.pow(meter, 2);

	if (bmi < 18.5) {
		return 'Underweight';
	} else if (bmi >= 18.5 && bmi <= 24.9) {
		return 'Normal (healthy weight)';
	} else if (bmi >= 25 && bmi <= 29.9) {
		return 'Overweight';
	} else if (bmi >= 30) {
		return 'Obese';
	}
};

console.log(calculateBMI(180, 74));
