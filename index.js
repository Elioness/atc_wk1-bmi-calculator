const heightInM = parseFloat(process.argv[2]);
const weightInKg = parseFloat(process.argv[3]);
const age = parseFloat(process.argv[4]);

function bmiCalculator() {
  const bmi = Math.round(weightInKg / (heightInM * heightInM), 5);
  const idealWeight = Math.round(22.5 * (heightInM * heightInM), 5);
  const bmr = 10 * weightInKg + 6.25 * (heightInM * 100) - 5 * age * 1.4;
  const weightToLose = weightInKg - idealWeight;
  const dietWeeks = Math.round(weightToLose / 0.5);
  const dietCalories = Math.round(bmr - 500);

  console.log(`
**************
BMI CALCULATOR
**************

height: ${heightInM} 
weight: ${weightInKg} 

****************
FACING THE FACTS
****************

Your BMI is ${bmi}

A BMI under 18.5 is considered underweight
A BMI above 25 is considered overweight

Your ideal weight is ${idealWeight} kg
With a normal lifestyle, you burn ${bmr} calories per day

**********
DIET PLAN
**********

If you want to reach your ideal weight of ${idealWeight} kg:

Eat ${dietCalories} calories a day
For ${dietWeeks} weeks
`);
}

bmiCalculator();
