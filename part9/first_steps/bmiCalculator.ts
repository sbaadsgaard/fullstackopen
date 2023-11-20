import { isNumber } from "./utils";


const calculateBmi = (bmiData: BMIData): string => {
    const { height, weight } = bmiData;
    const bmi: number = weight / ((height / 100) ** 2);
    let category: string;
    if (bmi < 18.5) {
        category = 'Underweight'
    } else if (bmi < 25) {
        category = 'Normal Range';
    } else if (bmi < 30) {
        category = 'Overweight';
    } else {
        category = 'Obese'
    }
    return `${category} (${bmi.toFixed(1)})`;
}

interface BMIData {
    height: number,
    weight: number
}

const parseArguments = () => {
    //console.log(process.argv[2], process.argv[3])
    //console.log(!isNumber(process.argv[2]), !isNumber(process.argv[3]), (!isNumber(process.argv[2]) || !isNumber(process.argv[3])));
    

    if (process.argv.length !== 4) {
        throw new Error('must provide exactly 2 arguments: height in centimeters and weight in kilograms');
    }

    if (!isNumber(process.argv[2]) || !isNumber(process.argv[3])) {
        
        throw new Error('All arguments must be numbers');
    }

    const [height, weight] = process.argv.slice(2).map(Number);
    if (height <= 0 || weight <= 0) {
        throw new Error('height and weight must both be positive numbers');
    }
    return {
        height,
        weight
    }
}

try {
    const bmiData = parseArguments()
    const result = calculateBmi(bmiData)
    console.log(result);
} catch (error: unknown) {
    let errorMsg = 'Something went wrong.'
    if (error instanceof Error) {
        errorMsg += error.message;
    }
    console.log(errorMsg);
}