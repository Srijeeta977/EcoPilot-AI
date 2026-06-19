// src/utils/coachEngine.js

import { coachRecommendations } from "../data/coachPlans";

export function generateCoachInsights(inputs, results) {
  const breakdown = results.categoryBreakdown;

  let highestCategory = "transport";
  let highestValue = 0;

  Object.entries(breakdown).forEach(([key, value]) => {
    if (value > highestValue) {
      highestValue = value;
      highestCategory = key;
    }
  });

  const quickWins = [];
  const longTermPlan = [];

  if (highestCategory === "transport") {
    quickWins.push(
      "Replace 2 car trips per week with public transport",
      "Combine errands into one journey",
      "Reduce short flights where possible"
    );

    longTermPlan.push(
      "Month 1: Reduce car travel by 10%",
      "Month 2: Increase public transport use",
      "Month 3: Cut one annual flight"
    );
  }

  if (highestCategory === "food") {
    quickWins.push(
      "Reduce red meat meals",
      "Add more plant-based meals",
      "Reduce food waste"
    );

    longTermPlan.push(
      "Month 1: Meat-free days",
      "Month 2: Improve food planning",
      "Month 3: Track food waste"
    );
  }

  if (highestCategory === "energy") {
    quickWins.push(
      "Switch off unused appliances",
      "Use energy-efficient lighting",
      "Reduce electricity consumption"
    );

    longTermPlan.push(
      "Month 1: Audit electricity use",
      "Month 2: Upgrade appliances",
      "Month 3: Increase renewable energy share"
    );
  }

  if (highestCategory === "waste") {
    quickWins.push(
      "Recycle more materials",
      "Reduce single-use products",
      "Start composting"
    );

    longTermPlan.push(
      "Month 1: Waste audit",
      "Month 2: Improve recycling habits",
      "Month 3: Reduce household waste"
    );
  }

  return {
    highestCategory,
    recommendations:
      coachRecommendations[highestCategory] ||
      coachRecommendations.transport,
    quickWins,
    longTermPlan,
  };
}