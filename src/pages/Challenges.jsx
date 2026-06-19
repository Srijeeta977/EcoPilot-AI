import { useEffect, useState } from "react";
import { challenges } from "../data/challengesData";

export default function Challenges() {
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("ecopilot.completedChallenges") || "[]"
    );

    setCompleted(saved);
  }, []);

  function completeChallenge(id) {
    if (completed.includes(id)) return;

    const updated = [...completed, id];

    setCompleted(updated);

    localStorage.setItem(
      "ecopilot.completedChallenges",
      JSON.stringify(updated)
    );
  }

  const totalPoints = completed.reduce((sum, id) => {
    const challenge = challenges.find((c) => c.id === id);
    return sum + (challenge?.points || 0);
  }, 0);

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-3">
          Green Challenges
        </h1>

        <p className="text-gray-500 mb-8">
          Complete sustainability challenges and build eco-friendly habits.
        </p>

        <div className="border rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold">
            Total Eco Points
          </h2>

          <p className="text-4xl font-bold mt-2">
            {totalPoints}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="border rounded-xl p-5"
            >
              <h3 className="text-xl font-semibold mb-2">
                {challenge.title}
              </h3>

              <p className="mb-3">
                {challenge.description}
              </p>

              <p>Impact: {challenge.impact}</p>
              <p>Points: {challenge.points}</p>

              <button
                className="mt-4 px-4 py-2 border rounded-lg"
                disabled={completed.includes(challenge.id)}
                onClick={() =>
                  completeChallenge(challenge.id)
                }
              >
                {completed.includes(challenge.id)
                  ? "Completed"
                  : "Complete Challenge"}
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}