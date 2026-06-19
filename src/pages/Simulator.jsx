import { useMemo, useState } from "react";
import { loadDashboardInputs } from "../utils/dashboardStorage";
import { simulateImpact } from "../utils/simulatorEngine";

export default function Simulator() {
  const dashboardInputs = loadDashboardInputs();

  const [carReduction, setCarReduction] = useState(0);

  const [renewableIncrease, setRenewableIncrease] = useState(
    dashboardInputs.renewablePercentage || 0
  );

  const [dietType, setDietType] = useState(
    dashboardInputs.dietType || "mixed"
  );

  const simulatedInputs = useMemo(
    () => ({
      ...dashboardInputs,

      carTravel:
        dashboardInputs.carTravel *
        (1 - carReduction / 100),

      renewablePercentage: renewableIncrease,

      dietType,
    }),
    [
      dashboardInputs,
      carReduction,
      renewableIncrease,
      dietType,
    ]
  );

  const simulation = useMemo(() => {
    return simulateImpact(
      dashboardInputs,
      simulatedInputs
    );
  }, [dashboardInputs, simulatedInputs]);

  function saveScenario() {
    const existing = JSON.parse(
      localStorage.getItem("ecopilot.simulations") || "[]"
    );

    existing.push({
      carReduction,
      renewableIncrease,
      dietType,
      monthlyReduction:
        simulation.monthlyReduction,
      annualReduction:
        simulation.annualReduction,
      savedAt: new Date().toISOString(),
    });

    localStorage.setItem(
      "ecopilot.simulations",
      JSON.stringify(existing)
    );

    alert("Scenario saved successfully!");
  }

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-3">
          Impact Simulator
        </h1>

        <p className="text-gray-500 mb-10">
          Explore how lifestyle changes can
          reduce your carbon footprint.
        </p>

        {/* Controls */}

        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="border rounded-xl p-5">
            <label className="font-medium block mb-3">
              Reduce Car Travel (%)
            </label>

            <input
              type="range"
              min="0"
              max="100"
              value={carReduction}
              onChange={(e) =>
                setCarReduction(Number(e.target.value))
              }
              className="w-full"
            />

            <p className="mt-2">
              {carReduction}%
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <label className="font-medium block mb-3">
              Renewable Energy (%)
            </label>

            <input
              type="range"
              min="0"
              max="100"
              value={renewableIncrease}
              onChange={(e) =>
                setRenewableIncrease(
                  Number(e.target.value)
                )
              }
              className="w-full"
            />

            <p className="mt-2">
              {renewableIncrease}%
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <label className="font-medium block mb-3">
              Diet Type
            </label>

            <select
              value={dietType}
              onChange={(e) =>
                setDietType(e.target.value)
              }
              className="w-full border rounded-lg p-2"
            >
              <option value="vegan">
                Vegan
              </option>

              <option value="vegetarian">
                Vegetarian
              </option>

              <option value="mixed">
                Mixed
              </option>

              <option value="highMeat">
                High Meat
              </option>
            </select>
          </div>

        </div>

        {/* Results */}

        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="border rounded-xl p-5">
            <h3 className="text-sm text-gray-500">
              Current Footprint
            </h3>

            <p className="text-2xl font-bold">
              {simulation.original.totalMonthly.toFixed(
                1
              )}{" "}
              kg
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <h3 className="text-sm text-gray-500">
              Simulated Footprint
            </h3>

            <p className="text-2xl font-bold">
              {simulation.simulated.totalMonthly.toFixed(
                1
              )}{" "}
              kg
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <h3 className="text-sm text-gray-500">
              Monthly Reduction
            </h3>

            <p className="text-2xl font-bold">
              {simulation.monthlyReduction.toFixed(
                1
              )}{" "}
              kg
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <h3 className="text-sm text-gray-500">
              Annual Reduction
            </h3>

            <p className="text-2xl font-bold">
              {simulation.annualReduction.toFixed(
                1
              )}{" "}
              kg
            </p>
          </div>

        </div>

        {/* Impact Summary */}

        <div className="border rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3">
            Impact Summary
          </h2>

          <p>
            Reducing car travel by{" "}
            <strong>{carReduction}%</strong>
            {" "}could save approximately{" "}
            <strong>
              {simulation.monthlyReduction.toFixed(
                1
              )} kg CO₂
            </strong>
            {" "}per month and{" "}
            <strong>
              {simulation.annualReduction.toFixed(
                1
              )} kg CO₂
            </strong>
            {" "}per year.
          </p>
        </div>

        {/* Save Scenario */}

        <button
          onClick={saveScenario}
          className="px-6 py-3 rounded-lg border font-medium"
        >
          Save Scenario
        </button>

      </div>
    </div>
  );
}