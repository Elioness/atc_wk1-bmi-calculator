const weightInKg = parseFloat(process.argv[2]);
const heightInM = parseFloat(process.argv[3]);
const age = parseFloat(process.argv[4]);
const doesExerciseDaily = process.argv[5];
const gender = process.argv[6];

if (age < 21) {
  console.log("This BMI calculator is designed for people over 20");

  process.exit();
}

if (process.argv.length !== 7) {
  console.log(`
    You gave ${process.argv.length - 2} arguments(s) to the program

    Please provide 5 arguments for
    
    weight (kg), 
    height (m), 
    age (years), 
    whether you exercise daily (yes or no)
    and your gender (m or f)
    
    Example:

    $ node index.js 82 1.79 32 yes m
  `);

  process.exit();
}

if (isNaN(weightInKg) || isNaN(heightInM) || isNaN(age)) {
  console.log(`
    Please make sure weight, height and age are numbers:

    weight (kg) example: 82 | your input: ${process.argv[2]}
    height (m) example 1.79 | your input: ${process.argv[3]}
    age (years) example 32  | your input: ${process.argv[4]} 

    $ node index.js 82 1.79 32 yes m
  `);

  process.exit();
}

if (weightInKg < 30 || weightInKg > 400) {
  console.log(`
  Please provide a number for weight in kilograms between 30 and 400
  
  $ node index.js 82 1.79 32 yes m`);

  process.exit();
}

if (doesExerciseDaily == !"yes" || "no") {
  console.log(`Please specify if you exercise daily with "yes" or "no"
  
  $ node index.js 82 1.79 32 yes m`);
  process.exit();
}

function bmiCalculator() {
  const bmi = Math.round(weightInKg / (heightInM * heightInM), 5);
  const idealWeight = Math.round(22.5 * (heightInM * heightInM), 5);
  const bmr = 10 * weightInKg + 6.25 * (heightInM * 100) - 5 * age;
  const dailyCaloriesExercise =
    doesExerciseDaily === "yes" ? bmr * 1.6 : bmr * 1.4;
  const weightToChange = weightInKg - idealWeight;
  console.log("weight to change", weightToChange);
  const dailyCalories =
    gender === "f"
      ? Math.round(dailyCaloriesExercise + 50)
      : Math.round(dailyCaloriesExercise - 150);
  const dietCalories =
    weightToChange < 0 // ? How to make it see that when a number is negative it should add
      ? Math.round(dailyCalories + 500)
      : Math.round(dailyCalories - 500);
  const dietWeeks = Math.round(Math.abs(weightToChange) / 0.5);

  console.log(`
**************
BMI CALCULATOR
**************

age: ${age} years
gender: ${gender}
height: ${heightInM} 
weight: ${weightInKg} 
do you exercise daily ${doesExerciseDaily}

****************
FACING THE FACTS
****************

Your BMI is ${bmi}

A BMI under 18.5 is considered underweight
A BMI above 25 is considered overweight

Your ideal weight is ${idealWeight} kg
With a normal lifestyle, you burn ${dailyCalories} calories per day

**********
DIET PLAN
**********

If you want to reach your ideal weight of ${idealWeight} kg:

Eat ${dietCalories} calories a day
For ${dietWeeks} weeks
`);
}

bmiCalculator();
