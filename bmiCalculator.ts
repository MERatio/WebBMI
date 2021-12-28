interface BmiArgs {
	heightCm: number;
	weightKg: number;
}

const parseBmiArguments = (args: Array<string>): BmiArgs => {
	if (args.length < 4) {
		throw new Error('Not enough arguments.');
	} else if (args.length > 4) {
		throw new Error('Too many arguments.');
	}

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			heightCm: Number(args[2]),
			weightKg: Number(args[3]),
		};
	} else {
		throw new Error('Arguments are not numbers.');
	}
};

const calculateBMI = (heightCm: number, weightKg: number): string => {
	const meter: number = heightCm / 100;
	const bmi: number = weightKg / Math.pow(meter, 2);

	if (bmi < 18.5) {
		return 'Underweight';
	} else if (bmi >= 18.5 && bmi <= 24.9) {
		return 'Normal (healthy weight)';
	} else if (bmi >= 25 && bmi <= 29.9) {
		return 'Overweight';
	} else {
		return 'Obese';
	}
};

try {
	const { heightCm, weightKg } = parseBmiArguments(process.argv);
	console.log(calculateBMI(heightCm, weightKg));
} catch (error: unknown) {
	let errorMessage: string = 'Something went wrong.';
	if (error instanceof Error) {
		errorMessage += ` Error: ${error.message}`;
	}
	console.log(errorMessage);
}
