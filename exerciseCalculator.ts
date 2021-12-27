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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
