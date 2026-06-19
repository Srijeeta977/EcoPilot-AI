import { motion } from 'framer-motion'
import { Activity, Gauge, ListChecks, TrendingDown } from 'lucide-react'

const stats = [
  {
    value: '32%',
    label: 'Carbon Reduction Potential',
    description: 'Average modeled opportunity from habit, energy, and mobility changes.',
    icon: TrendingDown,
  },
  {
    value: 'AI',
    label: 'Personalized Recommendations',
    description: 'Advice adapts to your goals, footprint patterns, and practical constraints.',
    icon: ListChecks,
  },
  {
    value: '4x',
    label: 'Sustainability Challenges',
    description: 'Guided action tracks repeatable wins across home, food, travel, and waste.',
    icon: Activity,
  },
  {
    value: 'Live',
    label: 'Real-Time Simulations',
    description: 'Forecast impact before changing a commute, meal plan, or energy routine.',
    icon: Gauge,
  },
]

export default function StatsSection() {
  return (
    <section className="bg-[#f8fbf8] px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase text-teal-700">
              Impact engine
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-emerald-950 sm:text-4xl">
              Designed around outcomes, not dashboards alone.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg">
              The product connects insight to action so users can understand
              what matters, test better choices, and keep momentum.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((stat, index) => {
              const Icon = stat.icon

              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
                  className="rounded-lg border border-emerald-950/10 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-4xl font-semibold text-emerald-950">
                        {stat.value}
                      </p>
                      <h3 className="mt-3 text-base font-semibold text-slate-900">
                        {stat.label}
                      </h3>
                    </div>
                    <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-cyan-100 text-cyan-700">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {stat.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
