import { calculateCarbonFootprint } from "./carbonCalculator";

export function simulateImpact(baseInputs, changes) {
  const simulatedInputs = {
    ...baseInputs,
    ...changes,
  };

  const original = calculateCarbonFootprint(baseInputs);
  const simulated = calculateCarbonFootprint(simulatedInputs);

  const monthlyReduction =
    original.totalMonthly - simulated.totalMonthly;

  const annualReduction =
    monthlyReduction * 12;

  return {
    original,
    simulated,
    monthlyReduction,
    annualReduction,
  };
}