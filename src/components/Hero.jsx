import { motion } from 'framer-motion'
import { ArrowRight, Bot, Gauge, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import heroGraphic from '../assets/hero.png'

const signalItems = ['Home energy', 'Daily travel', 'Food choices', 'Impact goals']

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-emerald-950/10 bg-[#f7fbf7]">
      <img
        src={heroGraphic}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-[-5rem] top-14 z-0 w-[24rem] opacity-25 sm:right-4 sm:w-[30rem] lg:right-12 lg:top-8 lg:w-[38rem]"
      />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(115deg,rgba(247,251,247,0.98)_0%,rgba(247,251,247,0.9)_42%,rgba(247,251,247,0.56)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 z-0 h-36 bg-[linear-gradient(180deg,rgba(247,251,247,0)_0%,rgba(228,244,232,0.95)_100%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pb-24 lg:pt-24">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 rounded-lg border border-teal-700/20 bg-white/75 px-3 py-2 text-sm font-semibold text-teal-800 shadow-sm backdrop-blur"
          >
            <Sparkles className="size-4" aria-hidden="true" />
            AI-powered carbon intelligence for everyday decisions
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: 'easeOut' }}
            className="mt-8 max-w-4xl text-5xl font-semibold leading-[1.04] text-emerald-950 sm:text-6xl lg:text-7xl"
          >
            Understand your footprint. Reduce it with precision.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16, ease: 'easeOut' }}
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl"
          >
            EcoPilot AI turns lifestyle data into personalized climate insights,
            practical recommendations, impact simulations, and challenges that
            make lower-carbon living measurable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24, ease: 'easeOut' }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-950 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-950/15 transition hover:bg-emerald-900"
            >
              Start Tracking
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
            <Link
              to="/coach"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-950/15 bg-white/80 px-6 py-3 text-base font-semibold text-emerald-950 shadow-sm backdrop-blur transition hover:bg-emerald-50"
            >
              <Bot className="size-5" aria-hidden="true" />
              Meet Your AI Coach
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.34, ease: 'easeOut' }}
          className="mt-12 grid gap-3 sm:grid-cols-2 lg:max-w-4xl lg:grid-cols-4"
        >
          {signalItems.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-lg border border-emerald-950/10 bg-white/75 px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur"
            >
              <Gauge className="size-4 text-teal-700" aria-hidden="true" />
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
