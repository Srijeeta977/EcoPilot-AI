import { useMemo } from "react";

import { loadDashboardInputs } from "../utils/dashboardStorage";
import { calculateCarbonFootprint } from "../utils/carbonCalculator";
import { generateCoachInsights } from "../utils/coachEngine";

export default function Coach() {
  const inputs = loadDashboardInputs();

  const results = useMemo(() => {
    return calculateCarbonFootprint(inputs);
  }, [inputs]);

  const insights = useMemo(() => {
    return generateCoachInsights(inputs, results);
  }, [inputs, results]);

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          AI Sustainability Coach
        </h1>

        <p className="text-gray-400 mb-8">
          Personalized sustainability guidance based on your carbon footprint.
        </p>

        {/* Summary Cards */}

        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="rounded-xl p-6 border">
            <h3 className="text-sm text-gray-500">
              Monthly Footprint
            </h3>
            <p className="text-2xl font-bold">
              {results.totalMonthly.toFixed(1)} kg
            </p>
          </div>

          <div className="rounded-xl p-6 border">
            <h3 className="text-sm text-gray-500">
              Annual Estimate
            </h3>
            <p className="text-2xl font-bold">
              {results.annualEstimate.toFixed(1)} t
            </p>
          </div>

          <div className="rounded-xl p-6 border">
            <h3 className="text-sm text-gray-500">
              Sustainability Score
            </h3>
            <p className="text-2xl font-bold">
              {results.sustainabilityScore}/100
            </p>
          </div>

          <div className="rounded-xl p-6 border">
            <h3 className="text-sm text-gray-500">
              Largest Source
            </h3>
            <p className="text-2xl font-bold capitalize">
              {insights.highestCategory}
            </p>
          </div>

        </div>

        {/* Quick Wins */}

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            Quick Wins
          </h2>

          <div className="grid md:grid-cols-3 gap-4">
            {insights.quickWins.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border p-5"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Long Term Plan */}

        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            90-Day Sustainability Plan
          </h2>

          <div className="space-y-3">
            {insights.longTermPlan.map((item, index) => (
              <div
                key={index}
                className="rounded-xl border p-4"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Personalized Recommendations
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {insights.recommendations.map((rec, index) => (
              <div
                key={index}
                className="rounded-xl border p-5"
              >
                <h3 className="font-semibold mb-2">
                  {rec.title}
                </h3>

                <p>Impact: {rec.impact}</p>
                <p>Difficulty: {rec.difficulty}</p>
                <p>Savings: {rec.savings}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}