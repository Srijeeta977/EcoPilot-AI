import { motion } from 'framer-motion'
import { BarChart3, Bot, Leaf, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'

const features = [
  {
    title: 'Carbon Tracking',
    description:
      'See emissions across travel, food, energy, and routines with clear trends that make progress visible.',
    icon: BarChart3,
    to: '/dashboard',
    accent: 'text-emerald-700 bg-emerald-100',
  },
  {
    title: 'AI Sustainability Coach',
    description:
      'Get personalized recommendations that match your habits, budget, location, and climate goals.',
    icon: Bot,
    to: '/coach',
    accent: 'text-teal-700 bg-teal-100',
  },
  {
    title: 'Impact Simulator',
    description:
      'Model the carbon effect of switching commutes, meals, appliances, or weekly routines before you act.',
    icon: Leaf,
    to: '/simulator',
    accent: 'text-lime-700 bg-lime-100',
  },
  {
    title: 'Green Challenges',
    description:
      'Join guided sustainability challenges that turn small actions into measurable, repeatable wins.',
    icon: Trophy,
    to: '/challenges',
    accent: 'text-amber-700 bg-amber-100',
  },
]

export default function FeatureCards() {
  return (
    <section className="bg-[#eef7f1] px-5 py-16 sm:px-6 sm:py-20 lg:px-8" id="features">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-teal-700">
            Platform capabilities
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight text-emerald-950 sm:text-4xl">
            One climate operating system for daily decisions.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-700 sm:text-lg">
            EcoPilot AI brings tracking, coaching, simulation, and action into a
            single product experience built for measurable behavior change.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
                className="group flex min-h-[17rem] flex-col rounded-lg border border-emerald-950/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-800/25 hover:shadow-xl hover:shadow-emerald-950/10"
              >
                <div
                  className={[
                    'grid size-12 place-items-center rounded-lg',
                    feature.accent,
                  ].join(' ')}
                >
                  <Icon className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-emerald-950">
                  {feature.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
                <Link
                  to={feature.to}
                  className="mt-6 text-sm font-semibold text-teal-700 transition group-hover:text-emerald-950"
                >
                  Explore {feature.title}
                </Link>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
