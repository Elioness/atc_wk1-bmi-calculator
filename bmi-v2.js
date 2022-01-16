function validateNumberOfInputs(argv) {
  if (argv.length !== 7) {
    console.log(`
      You gave ${argv.length - 2} argument(s) to the program
  
      Please provide 5 arguments for
      
      weight (kg), 
      height (m), 
      age (years), 
      wether you exercise daily (yes or no)
      and your gender (m or f)
      
      Example:
  
      $ node index.js 82 1.79 32 yes m
    `);

    process.exit();
  }
}

function validateWHA(weight, height, age) {
  if (isNaN(weight) || isNaN(height) || isNaN(age)) {
    console.log(`    
       Please make sure weight, height and age are numbers:

        weight (kg) example: 82 | your input: ${weight}
        height (m) example 1.79 | your input: ${height}
        age (years) example 32  | your input: ${age} 

        $ node index.js 82 1.79 32 yes m`);
    process.exit();
  }
}

function validateDailyExercise(exercise) {
  if (exercise === !"yes" || !"no") {
    console.log(
      `Please specify if you exercise daily with "yes" or "no"
  
      $ node index.js 82 1.79 32 yes m`
    );
    process.exit();
  }
}

function validateGender(gender) {
  if (gender === !"f" || !"m") {
    console.log(
      `Please specify your gender with either "f" or "m"
  
      $ node index.js 82 1.79 32 yes m`
    );
    process.exit();
  }
}

function calculateBMI(weight, height) {
  return Math.round(weight / (height * height));
}

function calculateBMR(weight, height, age, gender) {
  let BMR;
  if (gender === "f") {
    BMR = 10 * weight + 6.25 * (height * 100) - 5 * age + 50;
  } else {
    BMR = 10 * weight + 6.25 * (height * 100) - 5 * age - 150;
  }
  return BMR;
}

function calculateDailyCalories(BMR, doesExerciseDaily) {
  if (doesExerciseDaily === "y") {
    BMR * 1.6;
  } else {
    BMR * 1.4;
  }
}

function calculateDietCalories(weightToLose, dailyCalories) {
  if (weightToLose < 0) {
    Math.round(dailyCalories + 500);
  } else {
    Math.round(dailyCalories - 500);
  }
}

function bmiCalculator() {
  validateNumberOfInputs(process.argv);
  validateWHA(process.argv[2], process.argv[3], process.argv[4]);
  validateDailyExercise(process.argv[5]);
  validateGender(process.argv[6]);

  const weightInKg = parseFloat(process.argv[2]);
  const heightInM = parseFloat(process.argv[3]);
  const age = parseFloat(process.argv[4]);
  const doesExerciseDaily = process.argv[5];
  const gender = process.argv[6];

  const BMI = calculateBMI(weightInKg, heightInM);
  const BMR = calculateBMR(weightInKg, heightInM, age, gender);
  const idealWeight = Math.round(22.5 * heightInM * heightInM);
  const dailyCalories = calculateDailyCalories(BMR, doesExerciseDaily);
  const weightToLose = weightInKg - idealWeight;
  const dietCalories = calculateDietCalories(weightToLose, dailyCalories);
  const dietWeeks = Math.round(Math.abs(weightToLose / 0.5));

  console.log("WEIGHT: ", weightInKg);
  console.log("HEIGHT: ", heightInM);
  console.log("AGE: ", age);
  console.log("DAILY EXERCISE: ", doesExerciseDaily);
  console.log("GENDER: ", gender);

  console.log(`

****************
FACING THE FACTS
****************

Your BMI is ${BMI}

A BMI under 18.5 is considered underweight
A BMI above 25 is considered overweight

Your ideal weight is ${idealWeight} kg
With a normal lifestyle, you burn ${dailyCalories} calories per day

**********
DIET PLAN
**********

If you want to reach your ideal weight of ${idealWeight} kg:

Eat ${dietCalories} calories a day
For ${dietWeeks} weeks`);
}

bmiCalculator();
