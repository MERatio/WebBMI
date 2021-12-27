interface ExerciseArgs {
	hours: Array<number>;
	target: number;
}

const parseExerciseArguments = (args: Array<string>): ExerciseArgs => {
	if (args.length < 4) {
		throw new Error('Not enough arguments.');
	}

	const [, , target, ...hours] = args;

	if (isNaN(Number(target))) {
		throw new Error('Target is not a numbers.');
	}

	const doesHoursHaveNaN: boolean = hours.some((hour) => isNaN(Number(hour)));
	if (doesHoursHaveNaN) {
		throw new Error('Hours contains a value that is not a number.');
	}

	return {
		hours: hours.map((hour) => Number(hour)),
		target: Number(target),
	};
};

interface calculateExercisesReturnValue {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

interface calculateRatingReturnValue {
	rating: number;
	ratingDescription: string;
}

const calculateRating = (
	periodLength: number,
	numOfDaysTargetAchieved: number
): calculateRatingReturnValue => {
	if (numOfDaysTargetAchieved === periodLength) {
		return {
			rating: 3,
			ratingDescription:
				'you did it!, you achieved the target amount of daily hours in each day!',
		};
	} else if (numOfDaysTargetAchieved >= periodLength / 2) {
		return {
			rating: 2,
			ratingDescription: 'not too bad but could be better',
		};
	} else {
		return {
			rating: 1,
			ratingDescription: ':(',
		};
	}
};

const calculateExercises = (
	hours: Array<number>,
	target: number
): calculateExercisesReturnValue => {
	const periodLength: number = hours.length;
	const average: number =
		hours.reduce((prev: number, curr: number): number => prev + curr, 0) /
		hours.length;

	const numOfDaysTargetAchieved: number = hours.filter((hour) => hour >= target)
		.length;
	const calculatedRating: calculateRatingReturnValue = calculateRating(
		periodLength,
		numOfDaysTargetAchieved
	);

	return {
		periodLength,
		trainingDays: hours.filter((hour) => hour > 0).length,
		success: average >= target,
		rating: calculatedRating.rating,
		ratingDescription: calculatedRating.ratingDescription,
		target,
		average,
	};
};

try {
	const { hours, target } = parseExerciseArguments(process.argv);
	console.log(calculateExercises(hours, target));
} catch (error: unknown) {
	let errorMessage: string = 'Something went wrong.';
	if (error instanceof Error) {
		errorMessage += ` Error: ${error.message}`;
	}
	console.log(errorMessage);
}
