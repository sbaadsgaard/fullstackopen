import { isNumber, isNumberArray } from './utils';
interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const ratingDescriptions = (rating: number): string => {
    switch (rating) {
        case 1: return 'You must do better'
        case 2: return 'Not too bad but could be better'
        case 3: return 'Great job!'
        default: throw new Error('Invalid rating')
    }
}
const calculateExercises = (exerciseData: ExerciseData): Result => {
    const { target, exerciseHours } = exerciseData;
    const totalHours: number = exerciseHours.reduce((sum, hours) => sum + hours, 0);
    const periodLength: number = exerciseHours.length
    const trainingDays: number = exerciseHours.reduce((count: number, hours: number) => hours > 0 ? count + 1 : count, 0);
    const average = totalHours / (periodLength);
    const success = average >= target;
    const ratio = average / target; // should always be >= 0 assuming no negative values for target and exerciseHours
    let rating = 0;
    if (ratio < 0.5) rating = 1; //completed less than half of target gives rating of 1
    else if (ratio < 1) rating = 2;//completing more than half of target, but less than target gives rating of 2
    else rating = 3; //completing target or more gives rating of 3

    const result: Result = {
        periodLength,
        trainingDays,
        success,
        average,
        target,
        rating,
        ratingDescription: ratingDescriptions(rating)
    }

    return result;
}

interface ExerciseData {
    target: number,
    exerciseHours: number[]
}


const parseExerciseArguments = (): ExerciseData => {
    if (process.argv.length < 4) {
        throw new Error('insuficient arguments. Must provide <target> <training hours...>')
    }
    const args = process.argv.slice(2)
    if (!isNumberArray(args)) {
        throw new Error('All arguments must be numbers')
    }
    const [target, ...exerciseHours] = args.map(Number)
    return {
        target,
        exerciseHours
    }
}

try {
    const exerciseData = parseExerciseArguments()
    const result = calculateExercises(exerciseData)
    console.log(result);
    
    
} catch (error: unknown) {
    let errorMsg = 'Something went wrong.'
    if (error instanceof Error) {
        errorMsg += `Error: ${error.message}`;
    }
    console.log(errorMsg);
}

